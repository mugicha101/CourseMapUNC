import React, {memo, useState} from 'react';
import './CourseNode.css';
import { Handle } from 'react-flow-renderer';

const duplicate = (x, n) => Array.from(new Array(n), () => x);
const credit = <div className="credit"></div>;
const createCredits = (n=0) => duplicate(credit, n);

export default memo(({ data, isConnectable }) => {
    return (
        <div className={"courseNode bg-" + data.bg}>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className="courseId top-center">
                {data.courseId}
            </div>
            <div className="name top-center">
                {data.name}
            </div>
            <div className="creditGroup middle-left">
                {createCredits(data.credits)}
            </div>
        </div>
    );
});
