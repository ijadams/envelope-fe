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
            startupLoaded: false,
            navActive: false,
            arrowActive: false,
        }
    }

    componentDidMount() {
        navService.setDarkText(this.props.data.dark_text);

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
                startupLoaded: true
            })
        }, this.state.delay)
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
        this.arrowsub.unsubscribe();
    }

    render() {
        const delay = this.state.delay;
        const darkText = this.props.data.dark_text;
        return (
            <div className={`home--container ${this.state.startupLoaded ? "active" : ""} ${darkText ? "dark--text" : ""}`}>
                <div className={`project ${this.state.navActive || this.state.arrowActive ? "active" : ""}`}>
                    <div className={`lettering--container ${this.state.startupLoaded ? "active" : ""}`}>
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
                        buttonContentRight={<div className="right--panel "></div>}
                        buttonContentLeft={<div className="left--panel"></div>}
                        organicArrows={false}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={delay}
                        cssModule={[coreStyles]}
                    >
                        {this.props.data.project_images.map((p, i) => {
                            return <React.Fragment key={i+'--frag'}>
                                    <Section key={i+'--section'} backgroundColor="#000">
                                            <Background key={i+'--bg'} src={this.props.url + p.url} blurred={this.state.navActive || this.state.arrowActive} />
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
