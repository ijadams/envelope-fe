import React from 'react';

const Background = ({ src, alt = 'background', blurred }) => {
    return <img alt={alt} src={src} className={`background ${blurred ? "active" : ""}`} />;
};

export default Background;
