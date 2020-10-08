import React, {Component} from "react";
import AwesomeSlider from 'react-awesome-slider';
import * as coreStyles from 'react-awesome-slider/src/core/styles.scss';
import Background from "../Background";
import Section from "../Section";
import Lettering from "../Lettering";
import Startup from "../Startup";

import {
    withNavigationHandlers
} from "react-awesome-slider/dist/navigation";
import {navService} from "../../services";

const Slider = withNavigationHandlers(AwesomeSlider);

export class Project extends Component {


    constructor() {
        super();
        this.state = {
            delay: 2500,
            letteringActive: false,
            navActive: false,
            arrowActive: false,
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
        setTimeout(() => {
            this.setState({
                letteringActive: true
            })
        }, this.state.delay)
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
        this.arrowsub.unsubscribe();
    }

    render() {
        const delay = 2500;
        return (
            <div>
                <div className={`project ${this.state.navActive || this.state.arrowActive ? "active" : ""}`}>
                    <div className={`lettering--container ${this.state.letteringActive ? "active" : ""}`}>
                        <Lettering
                            title={this.props.data.project_title}
                            text={this.props.data.project_description}
                        />
                    </div>
                    <Slider
                        play={true}
                        infinite={true}
                        mobileTouch={true}
                        startupScreen={<Startup />}
                        startupDelay={delay}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={6000}
                        animation="foldOutAnimation"
                        cssModule={[coreStyles]}
                    >
                        {this.props.data.project_images.map((p, i) => {
                            return <React.Fragment key={i+'--frag'}>
                                    <Section key={i+'--section'} backgroundColor="#000">
                                            <Background key={i+'--bg'} src={this.props.url + p.url} />
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
