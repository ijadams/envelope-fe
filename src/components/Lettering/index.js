import React from 'react';

const Lettering = ({ text = [], title = '', tags = '' }) => {
    return (
        <div className="lettering">
            <p><span className="title">{title}</span><span className="description">{text}</span> <span className="tags">{tags}</span></p>
        </div>
    );
};

export default Lettering;
