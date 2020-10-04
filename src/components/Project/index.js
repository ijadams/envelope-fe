import React, {Component} from "react";
import AwesomeSlider from 'react-awesome-slider';
import * as coreStyles from 'react-awesome-slider/src/core/styles.scss';
import Background from "../Background";
import Section from "../Section";
import Lettering from "../Lettering";
import Content from "../Content";

export class Project extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div className="project">
                    <AwesomeSlider
                        play={true}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={6000}
                        animation="foldOutAnimation"
                        cssModule={[coreStyles]}
                    >
                        {this.props.data.project_images.map((p, i) => {
                            return <React.Fragment>
                                    <Section key={i+'--section'} backgroundColor="#ff6f5e">
                                            <Background key={i+'--bg'} src={this.props.url + p.url} />
                                            <Content
                                                key={i+'--content'}
                                                main={
                                                    <Lettering
                                                        key={i+'-lettering'}
                                                        title="PAGE-THREE"
                                                        text={["This is a screen with preloaded background image."]}
                                                    />
                                                }
                                                action={
                                                    <div className="button" key={i+'--action'}>
                                                        <button key={i+'-btn'}>click</button>
                                                    </div>
                                                }
                                            />
                                </Section>
                            </React.Fragment>
                        })}
                    </AwesomeSlider>
                </div>
            </div>
        );
    }
}

export default Project;
