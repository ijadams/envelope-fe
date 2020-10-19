import React, {Component} from "react";
import Query from "../../components/Query";
import PROJECTS_QUERY from "../../queries/projects/projects";
import Project from '../../components/Project/index';

export class Homepage extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;

        return (
            <div>
                <Query query={PROJECTS_QUERY}>
                    {({data: {projects}}) => {
                        return (
                            <div>
                                <section id="projects">
                                    {/*{projects.map((p, i) => {*/}
                                    {/*    return <Project data={p} url={url} key={i}></Project>*/}
                                    {/*})}*/}
                                    <Project data={projects[0]} url={url} key={0}></Project>
                                </section>

                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Homepage;
