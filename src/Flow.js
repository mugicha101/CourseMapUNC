import ReactFlow, {MiniMap, Controls, Background} from 'react-flow-renderer';
import CourseNode from './CourseNode';
const nodeTypes = {
    courseNode: CourseNode
}

export function Flow({ nodes, edges}) {
    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
        >
            <Background variant="lines" gap={25} size={0.25} color="rgb(0, 255, 255)" />
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
}