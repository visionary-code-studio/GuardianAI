import React from 'react';
import LogoIcon from './LogoIcon';

const Logo = ({ className }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <LogoIcon className="h-10 w-10" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Guardian AI</span>
        </div>
    );
};

export default Logo;
