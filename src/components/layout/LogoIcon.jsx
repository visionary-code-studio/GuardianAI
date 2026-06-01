import React from 'react';

const LogoIcon = ({ className = "w-10 h-10" }) => {
    return (
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 38C9.6 35.6 4 27.4 4 19V8L20 4L36 8V19C36 27.4 30.4 35.6 20 38Z" fill="#0066FF" stroke="#0066FF" strokeWidth="2" strokeLinejoin="round" />
            <path d="M20 12V26M13 19H27" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default LogoIcon;
