import React from 'react';
import Background from "../Background";
import Query from "../Query";
import LOADER_QUERY from "../../queries/loader/loader";
const Startup = () => {
    const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;
    return (
        <Query query={LOADER_QUERY}>
            {({data: {loader}}) => {
                return (
                    <div className="startup">
                        <Background src={url+loader.desktop.url} />
                    </div>
                );
            }}
        </Query>
    );
};

export default Startup;
