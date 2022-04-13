import ReactFlow, {MiniMap, Controls, Background, MarkerType} from 'react-flow-renderer';
import CourseNode from './CourseNode';
import {useEffect, useState} from "react";
import { getAuth } from '@firebase/auth';
import app from "./firebase";
import {doc, getDoc, getFirestore} from "@firebase/firestore";

const nodeTypes = {
    courseNode: CourseNode
}

const getData = async function () {
    const nodes = [];
    const edges = [];
    const groupColors = ["black", "red", "blue", "green"]

    const addCourse = function(x=0, y=0, courseId, name, credits=3, description="", reqs=[]) {
        nodes.push({
            id: courseId,
            type: "courseNode",
            data: {
                courseId: courseId,
                name: name,
                credits: credits,
                bg: courseId.split(' ')[0].toLowerCase(),
                description: description
            },
            position: { x: x*400, y: -y*100 }
        });
        for (let req of reqs) {
            edges.push({
                id: `${req.id}-${courseId}`,
                source: req.id,
                target: courseId,
                type: "bezier",
                style: {strokeWidth: "2px", stroke: req.group === -1? "black" : groupColors[req.group], strokeDasharray: ((req.group !== -1)? "10 10" : undefined)},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: groupColors[req.group]
                }
            });
        }
    }

    const req = function(courseId, group=0) {
        return {id: courseId, group: group};
    }

    const auth = getAuth(app);
    const db = getFirestore(app);

    const docRef = doc(db, "unc/comp");
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        for (const [id, data] of Object.entries(docSnap.data())) {
            console.log(id, data);
            const reqs = [];
            for (const [id, group] of Object.entries(data.reqs)) {
                reqs.push(req(id, group))
            }
            addCourse(data.pos[0], data.pos[1], id, data.name, data.credits, data.description, reqs);

        }
    } else {
        throw new Error("firestore document failed to load");
    }

    nodes.sort((a, b) => {
        return a.position.y - b.position.y;
    });

    return {nodes: nodes, edges: edges}
}

export function Flow({department="unc/comp"}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (data == null) {
                try {
                    setLoading(true);
                    const data = await getData();
                    setData(data);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setData({nodes: [], edges: []});
                    console.log(error);
                }
            }
        }
        fetchData();
    });

    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={data == null? [] : data.nodes}
            edges={data == null? [] : data.edges}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={false}
            onMouseOver={(e) => {
                e.preventDefault();
            }}
        >
            <Background variant="lines" gap={25} size={0.25} color="rgb(0, 255, 255)" />
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
}