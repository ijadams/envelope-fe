import React from 'react';
import Query from "../Query";
import INFO_QUERY from "../../queries/info/info";
import ReactMarkdown from "react-markdown";

export const InfoOverlay = (props) => {

    return (
        <Query query={INFO_QUERY}>
            {({data: {info}}) => {
                return (
                    <div className={`nav--overlay ${props.active ? "active" : ""}`}>
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
