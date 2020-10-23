import React, {Component} from "react";
import AwesomeSlider from 'react-awesome-slider';
import * as coreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/scale-out-animation/scale-out-animation.scss';

import Background from "../Background";
import Section from "../Section";
import Lettering from "../Lettering";
import equal from 'fast-deep-equal'

import {
    withNavigationHandlers
} from "react-awesome-slider/dist/navigation";
import {navService} from "../../services";

const Slider = withNavigationHandlers(AwesomeSlider);

export class Project extends Component {


    constructor() {
        super();
        this.state = {
            delay: 2250,
            startupLoaded: false,
            navActive: false,
            arrowActive: false,
            darkText: false,
            activeSlide: 0,
            fingered: false
        }
    }

    componentDidMount() {
        // subscribe to home component messages
        this.navsub = navService.getNav().subscribe(data => {
            this.setState({
                navActive: data.active
            })
        });
        this.arrowsub = navService.getArrow().subscribe(data => {
            this.setState({
                arrowActive: data.arrowActive
            })
        });
        this.darktextsub = navService.getDarkText().subscribe(data => {
            this.setState({
                darkText: data.darkText
            })
        });

        // set dark text for initial slide
        this.setDarkText(0);

        // loading and init
        setTimeout(() => {
            this.setState({
                startupLoaded: true,
                delay: 1250
            });
        }, this.state.delay);
    }

    setDarkText(index) {
        if (this.props.data.dark_slide_list && this.props.data.dark_slide_list.length && this.props.data.dark_slide_list.length >= index - 1) {
            navService.setDarkText(this.props.data.dark_slide_list[index]);
        } else {
            navService.setDarkText(false);
        }
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.data, prevProps.data)) {
            setTimeout(() => {
                this.setState({
                    startupLoaded: false,
                    activeSlide: 0
                });
            }, 500)
            this.componentDidMount();
        }
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
        this.arrowsub.unsubscribe();
        this.darktextsub.unsubscribe();
    }

    activeSlide(pos) {
        this.setState({fingered: true})
        if (pos === 'left') {
            if (this.state.activeSlide === 0) {
                this.setState({activeSlide: this.props.data.project_images.length - 1})
                this.setDarkText(this.props.data.project_images.length - 1);
            } else {
                this.setState({activeSlide: this.state.activeSlide - 1});
                this.setDarkText(this.state.activeSlide - 1);
            }
        }
        if (pos === 'right') {
            if (this.state.activeSlide === this.props.data.project_images.length - 1) {
                this.setState({activeSlide: 0});
                this.setDarkText(0);
            } else {
                this.setState({activeSlide: this.state.activeSlide + 1});
                this.setDarkText(this.state.activeSlide + 1);
            }
        }
    }

    render() {
        const delay = this.state.delay;
        const finger = this.state.darkText ? "https://ijadams.s3.amazonaws.com/envelope/finger-b.png" : "https://ijadams.s3.amazonaws.com/envelope/finger-w.png";
        return (
            <div
                className={`home--container ${this.state.startupLoaded ? "active" : ""} ${this.state.darkText ? "dark--text" : ""}`}>
                <div className={`project ${this.state.navActive || this.state.arrowActive ? "active" : ""}`}>
                    <div id="finger" className={`${this.props.activeIndex === 0 && !this.state.fingered ? "" : "hidden"}`}>
                        <img alt="finger" src={finger}/>
                    </div>
                    <div
                        className={`lettering--container ${this.state.darkText ? "dark--text" : ""} ${this.state.startupLoaded ? "active" : ""}`}>
                        <Lettering
                            title={this.props.data.project_title}
                            text={this.props.data.project_description}
                            tags={this.props.data.project_tags}
                        />
                    </div>
                    <Slider
                        play={true}
                        infinite={true}
                        mobileTouch={true}
                        animation="scaleOutAnimation"
                        cssModule={[coreStyles, AnimationStyles]}
                        buttonContentRight={<div className="right--panel" onClick={() => {
                            this.activeSlide('right')
                        }}></div>}
                        buttonContentLeft={<div className="left--panel" onClick={() => {
                            this.activeSlide('left')
                        }}></div>}
                        selected={this.state.activeSlide}
                        organicArrows={false}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={delay}
                    >
                        {this.props.data.project_images.map((p, i) => {
                            return <React.Fragment key={i + '--frag'}>
                                <Section key={i + '--section'} backgroundColor="#000">
                                    <Background key={i + '--bg'} src={this.props.url + p.url}
                                                blurred={this.state.navActive || this.state.arrowActive}/>
                                </Section>
                            </React.Fragment>
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Project;
