import React from "react";
import Slider from "react-slick";

const Project = (props) => {
    return (
        <div className="project">
            <Slider {...props.settings}>
                {props.data.project_images.map((p, i) => {
                    return <img key={i} src={props.url + p.url} alt={props.id}/>
                })}
            </Slider>
        </div>
    );
};

export default Project;
