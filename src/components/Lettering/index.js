import React from 'react';

const Lettering = ({ text = [], title = '' }) => {
    return (
        <div className="lettering">
            <p><span className="title">{title}</span>{text}</p>
        </div>
    );
};

export default Lettering;
