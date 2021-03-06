import React, {memo, useState} from 'react';
import './CourseNode.css';
import { Handle } from 'react-flow-renderer';

const duplicate = (x, n) => Array.from(new Array(n), () => x);
const credit = <div className="credit"/>;
const createCredits = (n=0) => duplicate(credit, n);

export default memo(({ data, isConnectable }) => {
    let idSplit = data.courseId.split(" ");
    return (
        <div className={"courseNode bg-" + data.bg}>
            <a href={"https://www.coursicle.com/unc/courses/" + idSplit[0] + "/" + idSplit[1] + "/"} target="_blank">
                <Handle
                    type="target"
                    position="left"
                    style={{
                        background: "black",
                        borderColor: "transparent"
                    }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <Handle
                    type="source"
                    position="right"
                    style={{
                        background: "black",
                        borderColor: "transparent"
                    }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <div className="courseId top-center">
                    <div className="idBox top-center"><div className="idText">{data.courseId}</div></div>
                </div>
                <div className="nameBox top-center">
                    <div className="name center">{data.name}</div>
                </div>
                <div className="creditGroup middle-left">
                    {createCredits(data.credits)}
                </div>
                <div className="hoverBox">
                    <div className="triangle"/>
                    <div className="box">
                        {data.description}
                    </div>
                </div>
            </a>
        </div>
    );
});
