// src/components/common/CircleShape.tsx

import React from 'react';

type CircleShapeType = {
    width: string;
    height: string;
    bottom: string;
    right: string;
}

const CircleShape: React.FC<CircleShapeType> = ({ width, height, bottom, right }) => {
    return (
        <div className={`absolute ${width} ${height} ${bottom} ${right}  rounded-full gradient`}>
        </div>
    );
};

export default CircleShape;