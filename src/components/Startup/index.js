import React from 'react';
import Background from "../Background";
import Query from "../Query";
import LOADER_QUERY from "../../queries/loader/loader";

const Startup = (props) => {
    const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;
    const isMobile = /Android|Mobi/i.test(navigator.userAgent);
    return (
        <Query query={LOADER_QUERY}>
            {({data: {loader}}) => {
                return (
                    <div className={`startup ${props.loaded ? "loaded" : ""}`}>
                        <Background src={isMobile ? url + loader.mobile.url : url + loader.desktop.url}/>
                    </div>
                );
            }}
        </Query>
    );
};

export default Startup;
