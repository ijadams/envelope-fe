import React, {Component} from "react";
import Query from "../../components/Query";
import PROJECTS_QUERY from "../../queries/projects/projects";
import Project from '../../components/Project/index';
import Startup from "../../components/Startup";
import {navService} from "../../services";

export class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            projectsLoaded: false
        }
    }

    componentDidMount() {
        this.setState({projectsLoaded: true})
    }

    render() {
        const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;

        return (
            <div>
                <Startup loaded={this.state.projectsLoaded ? setTimeout(() => {return true;}, 2500) : false}/>
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
