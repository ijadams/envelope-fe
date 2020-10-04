import React from 'react';

const Lettering = ({ text = [], title = '' }) => {
    return (
        <div className="lettering">
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    );
};

export default Lettering;
