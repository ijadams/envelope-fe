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
            projectsLoaded: false,
            activeIndex: 0,
            sliderLoading: false
        }
    }

    componentDidMount() {



        setTimeout(() => {
            this.setState({projectsLoaded: true});
        }, 300)

        this.subscriptionLoader = navService.getActiveIndex().subscribe(data => {
            this.setState({
                activeIndex: data.activeIndex,
                sliderLoading: true
            });
            setTimeout(() => {
                this.setState({
                    sliderLoading: false
                });
            }, 1000)
        });
    }

    componentWillUnmount() {
        this.subscriptionLoader.unsubscribe();
    }

    render() {
        const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;

        return (
            <div>
                <Startup loaded={this.state.projectsLoaded ? setTimeout(() => {
                    return true;
                }, 2500) : false}/>
                <div className={`slider--overlay ${this.state.sliderLoading ? "active" : ""}`}></div>
                <Query query={PROJECTS_QUERY}>
                    {({data: {projects}}) => {
                        return (
                            <div>
                                {this.state.projectsLoaded &&
                                    <section id="projects">
                                        <Project data={projects[this.state.activeIndex]} activeIndex={this.state.activeIndex} url={url} key={0}></Project>
                                    </section>
                                }
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Homepage;
