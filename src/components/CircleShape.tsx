// src/components/common/CircleShape.tsx

import { cn } from '@/lib/utils';
import React from 'react';

const CircleShape = ({ className }:{className:string}) => {
    return (
        <div className={cn(`absolute rounded-full gradient`, className)}>
        </div>
    );
};

export default CircleShape;