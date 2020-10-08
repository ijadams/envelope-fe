import React from 'react';
import {navService} from "../../services";
import Query from "../Query";
import INFO_QUERY from "../../queries/info/info";
import ReactMarkdown from "react-markdown";

export const InfoOverlay = (props) => {

    function closeNav() {
        navService.toggleNav(false);
    }

    return (
        <Query query={INFO_QUERY}>
            {({data: {info}}) => {
                return (
                    <div className={`nav--overlay ${props.active ? "active" : ""}`}>
                        <div className="close--container" onClick={closeNav}>
                            <img src="https://ijadams.s3.amazonaws.com/envelope/info-black.png" alt="chevron"/>
                        </div>
                        <div className="top">
                            <ReactMarkdown source={info.top}/>
                        </div>
                        <div className="bottom">
                            <ReactMarkdown source={info.bottom}/>
                        </div>
                    </div>
                )
            }}
        </Query>
    );

};
