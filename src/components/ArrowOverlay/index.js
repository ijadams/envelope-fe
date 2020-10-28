import React from 'react';
import Query from "../Query";
import PROJECTS_QUERY from "../../queries/projects/projects";
import {navService} from "../../services";

export const ArrowOverlay = (props) => {
    const navigateToProject = (i) => {
        navService.toggleArrow(false);
        navService.toggleNav(false);
        setTimeout(() => {
            navService.setActiveIndex(i);
        }, 25)
    };

    return (
        <div>
            <Query query={PROJECTS_QUERY}>
                {({data: {projects}}) => {
                    return (
                        <div>
                            <div className={`nav--overlay arrow--overlay ${props.active ? "active" : ""} ${props.darkText ? "dark--text" : ""}`}>
                                <ul className="project--nav">
                                    {projects.map((p, i) => {
                                        return <li key={i} onClick={() => {
                                            navigateToProject(i)
                                        }}>
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
