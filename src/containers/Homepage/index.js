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
            sliderLoading: false,
            projects: null
        }
    }

    componentDidMount() {

        setTimeout(() => {
            navService.setProjectsLoaded(true);
            this.setState({projectsLoaded: true});
        }, 300)

        this.projectssubcription = navService.getProjects().subscribe(data => {
            this.setState({projects: data.projects});
        });

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

    onWheel(event) {
        if (event.deltaY < 0 && this.state.activeIndex !== this.state.projects.length - 1) {
            const i = this.state.activeIndex + 1;
            navService.setActiveIndex(i)
            navService.toggleArrow(false);
            navService.toggleNav(false);
        } else if (event.deltaY > 0 && this.state.activeIndex !== 0) {
            const i = this.state.activeIndex - 1;
            navService.setActiveIndex(i);
            navService.toggleArrow(false);
            navService.toggleNav(false);
        }
    }

    setProjects(projects) {
        if (!this.state.projects) {
            navService.setProjects(projects)
        }
    }

    componentWillUnmount() {
        this.subscriptionLoader.unsubscribe();
        this.projectssubcription.unsubscribe();
    }

    render() {
        const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;

        return (
            <div onWheel={(e) => this.onWheel(e)}>
                <Startup loaded={this.state.projectsLoaded ? setTimeout(() => {
                    return true;
                }, 2500) : false}/>
                <div className={`slider--overlay ${this.state.sliderLoading ? "active" : ""}`}></div>
                <Query query={PROJECTS_QUERY}>
                    {({data: {projects}}) => {
                        return (
                            <div>
                                {this.setProjects(projects)}
                                {this.state.projectsLoaded &&
                                <section id="projects">
                                    <Project data={projects[this.state.activeIndex]}
                                             activeIndex={this.state.activeIndex} url={url} key={0}></Project>
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
