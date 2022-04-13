import logo from './logo.svg';
import './App.css';
import {Flow} from "./Flow";
import {MarkerType} from "react-flow-renderer";

const nodes = [];
const edges = [];
const groupColors = ["black", "red", "blue", "green"]
const addCourse = function(x=0, y=0, courseId, name, credits=3, ...reqs) {
    nodes.push({
        id: courseId,
        type: "courseNode",
        data: {
            courseId: courseId,
            name: name,
            credits: credits,
            bg: courseId.split(' ')[0].toLowerCase()
        },
        position: { x: x*400, y: -y*100 }
    });
    console.log(reqs);
    for (let req of reqs) {
        edges.push({
            id: `${req.id}-${courseId}`,
            source: req.id,
            target: courseId,
            type: "bezier",
            style: {strokeWidth: "2px", stroke: groupColors[req.group], strokeDasharray: (req.chooseOne? "10 10" : undefined)},
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: groupColors[req.group]
            }
        });
    }
}

const req = function(courseId, chooseOne=false, group=0) {
    return {id: courseId, chooseOne: chooseOne, group: group};
}

addCourse(2, -1,"COMP 110", "Introduction to Programming and Data Science", 3);
addCourse(2, -2, "COMP 116", "Introduction to Scientific Programming", 3)
addCourse(3, -0.5,"COMP 210", "Data Structures and Analysis", 3, req("COMP 110", true, 1), req("COMP 116", true, 1), req("COMP 283", true, 2), req("MATH 381", true, 2));
addCourse(4, 0.5,"COMP 211", "Systems Fundamentals", 3, req("COMP 210"));
addCourse(5, 1, "COMP 311", "Computer Organization", 3, req("COMP 211"));
addCourse(5, 0, "COMP 550", "Algorithms and Analysis", 3, req("COMP 211"), req("COMP 301"))
addCourse(4, -0.5,"COMP 301", "Foundations of Programming", 3, req("COMP 210"));
addCourse(4, -1.5, "COMP 455", "Models of Languages and Composition", 3, req("COMP 210"))
addCourse(0, 2, "MATH 231", "Calculus of Functions of One Variable I", 4);
addCourse(1, 2, "MATH 232", "Calculus of Functions of One Variable II", 4, req("MATH 231"));
addCourse(2, 2, "MATH 233", "Calculus of Functions of Several Variables", 4, req("MATH 232"));
addCourse(2, 0, "COMP 283", "Discrete Structures", 3, req("MATH 231"))
addCourse(2, 1, "MATH 381", "Discrete Mathematics", 3, req("MATH 232"));
addCourse(2, 3, "MATH 347", "Linear Algebra for Applications", 3, req("MATH 232"));
addCourse(3, 2, "MATH 383", "First Course in Differential Equations", 3, req("MATH 233"));

nodes.sort((a, b) => {
    return a.position.y - b.position.y;
});

function App() {
  return (
    <div className="App">
      <Flow nodes={nodes} edges={edges}/>
    </div>
  );
}

export default App;
