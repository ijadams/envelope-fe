import React from 'react';
import Query from "../Query";
import PROJECTS_QUERY from "../../queries/projects/projects";

export const ArrowOverlay = (props) => {

    return (
        <div>
            <Query query={PROJECTS_QUERY}>
                {({data: {projects}}) => {
                    console.log(projects)
                    return (
                        <div>
                            <div className={`nav--overlay ${props.active ? "active" : ""}`}>
                                <ul className="project--nav">
                                    {projects.map((p, i) => {
                                        return <li key={i}>
                                            <div>
                                                <span className="project--title">{p.project_title} <span
                                                    className="index">{i + 1}</span></span>
                                                <span className="tags">{p.project_tags}</span>
                                            </div>
                                        </li>
                                    })}
                                </ul>

                            </div>
                        </div>
                    );
                }}
            </Query>
        </div>
    );
};
