import logo from './logo.svg';
import './App.css';
import {Flow} from "./Flow";
import {MarkerType} from "react-flow-renderer";

const nodes = [];
const edges = [];
const groupColors = ["black", "red", "blue", "green"]
const addCourse = function(x=0, y=0, courseId, name, credits=3, description="", ...reqs) {
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

addCourse(2, -1,"COMP 110", "Introduction to Programming and Data Science", 3, "Introduces students to programming and data science from a computational perspective. With an emphasis on modern applications in society, students gain experience with problem decomposition, algorithms for data analysis, abstraction design, and ethics in computing. No prior programming experience expected. Foundational concepts include data types, sequences, boolean logic, control flow, functions/methods, classes/objects, input/output, data organization, transformations, and visualizations. Students may not enroll in COMP 110 after receiving credit for COMP 116 or greater. Honors version available");
addCourse(2, -2, "COMP 116", "Introduction to Scientific Programming", 3, "An introduction to programming for computationally oriented scientists. Fundamental programming skills, typically using MATLAB or Python. Problem analysis and algorithm design with examples drawn from simple numerical and discrete problems. Students can receive credit for only one of COMP 110 and 116.")
addCourse(3, -0.5,"COMP 210", "Data Structures and Analysis", 3, "This course will teach you how to organize the data used in computer programs so that manipulation of that data can be done efficiently on large problems and large data instances. Rather than learning to use the data structures found in the libraries of programming languages, you will be learning how those libraries are constructed, and why the items that are included in them are there (and why some are excluded).", req("COMP 110", true, 1), req("COMP 116", true, 1), req("COMP 283", true, 2), req("MATH 381", true, 2));
addCourse(4, 0.5,"COMP 211", "Systems Fundamentals", 3, "This is the first course in the introductory systems sequence. Students enter the course having taken an introductory programming course in a high-level programming language (COMP 110) and a course in discrete structures. The overarching goal is to bridge the gap between a students' knowledge of a high-level programming language (COMP 110) and computer organization (COMP 311).", req("COMP 210"));
addCourse(5, 1, "COMP 311", "Computer Organization", 3, "Introduction to computer organization and design. Students will be introduced to the conceptual design of a basic microprocessor, along with assembly programming. The course includes fundamental concepts such as binary numbers, binary arithmetic, and representing information as well as instructions. Students learn to program in assembly (i.e., machine) language. The course covers the fundamentals of computer hardware design, transistors and logic gates, progressing through basic combinational and sequential components, culminating in the conceptual design CPU.", req("COMP 211"));
addCourse(5, 0, "COMP 550", "Algorithms and Analysis", 3, "Formal specification and verification of programs. Techniques of algorithm analysis. Problem-solving paradigms. Survey of selected algorithms.", req("COMP 211"), req("COMP 301"))
addCourse(4, -0.5,"COMP 301", "Foundations of Programming", 3, "Students will learn how to reason about how their code is structured, identify whether a given structure is effective in a given context, and look at ways of organizing units of code that support larger programs. In a nutshell, the primary goal of the course is to equip students with tools and techniques that will help them not only in later courses in the major but also in their careers afterwards.", req("COMP 210"));
addCourse(4, -1.5, "COMP 455", "Models of Languages and Composition", 3, "Introduction to the theory of computation. Finite automata, regular languages, pushdown automata, context-free languages, and Turing machines. Undecidable problems.", req("COMP 210"))
addCourse(0, 2, "MATH 231", "Calculus of Functions of One Variable I", 4, "Limits, derivatives, and integrals of functions of one variable. Students may not receive credit for both MATH 231 and MATH 241. Honors version available");
addCourse(1, 2, "MATH 232", "Calculus of Functions of One Variable II", 4, "Calculus of the elementary transcendental functions, techniques of integration, indeterminate forms, Taylor's formula, infinite series. Honors version available", req("MATH 231"));
addCourse(2, 2, "MATH 233", "Calculus of Functions of Several Variables", 4, "Vector algebra, solid analytic geometry, partial derivatives, multiple integrals. Honors version available", req("MATH 232"));
addCourse(2, 0, "COMP 283", "Discrete Structures", 3, "Introduces discrete structures (sets, tuples, relations, functions, graphs, trees) and the formal mathematics (logic, proof, induction) used to establish their properties and those of algorithms that work with them. Develops problem-solving skills through puzzles and applications central to computer science. Honors version available", req("MATH 231"))
addCourse(2, 1, "MATH 381", "Discrete Mathematics", 3, "This course serves as a transition from computational to more theoretical mathematics. Topics are from the foundations of mathematics: logic, set theory, relations and functions, induction, permutations and combinations, recurrence. Honors version available", req("MATH 232"));
addCourse(2, 3, "MATH 347", "Linear Algebra for Applications", 3, "Algebra of matrices with applications: determinants, solution of linear systems by Gaussian elimination, Gram-Schmidt procedure, and eigenvalues. Previously offered as MATH 547.", req("MATH 232"));
addCourse(3, 2, "MATH 383", "First Course in Differential Equations", 3, "Introductory ordinary differential equations, first- and second-order differential equations with applications, higher-order linear equations, systems of first-order linear equations (introducing linear algebra as needed). Honors version available", req("MATH 233"));

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
