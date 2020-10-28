import React, {Component} from "react";
import Query from "../../components/Query";
import PROJECTS_QUERY from "../../queries/projects/projects";
import Project from '../../components/Project/index';
import Startup from "../../components/Startup";
import {navService} from "../../services";
import { Swipeable } from 'react-swipeable'

export class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            projectsLoaded: false,
            activeIndex: 0,
            sliderLoading: false,
            mobileDragDisable: false,
            projectsLength: null,
            isMobile: false,
            touchStart: null,
            touchEnd: null,
        }
    }

    componentDidMount() {

        const isMobile = /Android|Mobi/i.test(navigator.userAgent);

        if (isMobile) {
            this.setState({isMobile: true});
        }

        setTimeout(() => {
            navService.setProjectsLoaded(true);
            this.setState({projectsLoaded: true});
        }, 300)

        this.projectssubcription = navService.getProjectsLength().subscribe(data => {
            this.setState({projectsLength: data.projectsLength});
        });

        this.subscriptionLoader = navService.getActiveIndex().subscribe(data => {
            this.setState({
                sliderLoading: true
            });
            this.setState({
                activeIndex: data.activeIndex
            });

            setTimeout(() => {
                this.setState({
                    mobileDragDisable: false
                });
            }, 2250)

            setTimeout(() => {
                this.setState({
                    sliderLoading: false
                });
            }, 1250)
        });
    }


    onWheel(event) {
        if (Math.abs(event.deltaY) < 10 || this.state.sliderLoading) {
            return
        }
        if (event.deltaY > 0 && this.state.activeIndex !== this.state.projectsLength - 1) {
            const i = this.state.activeIndex + 1;
            navService.setActiveIndex(i)
        } else if (event.deltaY < 0 && this.state.activeIndex > 0) {
            const i = this.state.activeIndex - 1;
            navService.setActiveIndex(i);
        }
    }

    onSwipe(event) {
        if (!this.state.sliderLoading && !this.state.mobileDragDisable) {
            if (event.dir === "Up" && this.state.activeIndex !== this.state.projectsLength - 1) {
                const i = this.state.activeIndex + 1;
                navService.setActiveIndex(i)
                this.setState({mobileDragDisable: true});
            } else if (event.dir === "Down" && this.state.activeIndex > 0) {
                const i = this.state.activeIndex - 1;
                navService.setActiveIndex(i);
                this.setState({mobileDragDisable: true});
            }
        }
    }

    componentWillUnmount() {
        this.subscriptionLoader.unsubscribe();
        this.projectssubcription.unsubscribe();
    }

    render() {
        const url = process.env.NODE_ENV !== "development" ? '' : process.env.REACT_APP_BACKEND_URL;
        const config = {
            delta: 10,                             // min distance(px) before a swipe starts
            preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
            trackTouch: true,                      // track touch input
            trackMouse: false,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
        };

        return (
            <div onWheel={(e) => this.onWheel(e)}>
                <Swipeable onSwiped={(eventData) => this.onSwipe(eventData)} {...config} >
                    <Startup loaded={this.state.projectsLoaded ? setTimeout(() => {
                        return true;
                    }, 2500) : false}/>
                    <div className={`slider--overlay ${this.state.sliderLoading ? "active" : ""}`}></div>
                    <Query query={PROJECTS_QUERY}>
                        {({data: {projects}}) => {
                            return (
                                <div>
                                    {this.state.projectsLoaded &&
                                    <section id="projects"
                                             className={`${this.state.sliderLoading ? "slide--loading" : ""}`}>
                                        <Project data={projects[this.state.activeIndex]}
                                                 projectsLength={projects.length}
                                                 activeIndex={this.state.activeIndex} url={url} key={0}></Project>
                                    </section>
                                    }
                                </div>
                            );
                        }}
                    </Query>
                </Swipeable>
            </div>
        );
    }
}

export default Homepage;
