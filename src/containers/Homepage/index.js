import React, {Component} from "react";
import Query from "../../components/Query";
import HOMEPAGE_QUERY from "../../queries/homepage/homepage";
import ReactMarkdown from 'react-markdown';

export class Homepage extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Query query={HOMEPAGE_QUERY} id={null}>
                    {({data: {homepage}}) => {
                        return (
                            <div>
                                <div className="bg--gradient"></div>
                                <section className="hero">
                                    <div>
                                        <h1 className="uk-text-lead">{homepage.herotext}</h1>
                                        <p>{homepage.subherotext}</p>
                                        <div className="button--container">
                                            <a href="#sectionTwo">
                                                <button
                                                    className="uk-button uk-button-default two">{homepage.cta_button_text}</button>
                                            </a>
                                        </div>
                                    </div>
                                </section>

                                <section id="sectionTwo" className="mega-frame"
                                         dangerouslySetInnerHTML={{__html: homepage.iframe_hero_markdown}}>
                                </section>

                                <section className="hero--sub chrome--mega--container">
                                    <div className="half uk-cover-container left chrome--container chrome--container">
                                        <div className="chrome uk-box-shadow-large" dangerouslySetInnerHTML={{__html: homepage.iframe_section_2_markdown}}>
                                        </div>
                                    </div>
                                    <div className="half">
                                        <div className="uk-padding-large">
                                            <ReactMarkdown source={homepage.section_1_text}/>
                                            <img alt="this is some good stuff"
                                                 src="https://i.vimeocdn.com/custom_asset/1152.png"/>
                                        </div>
                                    </div>
                                </section>
                                <section className="hero--sub right">
                                    <div className="half">
                                        <div className="uk-padding-large">
                                            <ReactMarkdown source={homepage.section_2_text}/>
                                        </div>
                                    </div>
                                    <div className="half">
                                        <div className="iphone-ipad"></div>
                                    </div>
                                </section>
                                <section className="hero--sub left">
                                    <div className="half">
                                        <div className="analytics"></div>
                                    </div>
                                    <div className="half">
                                        <div className="uk-padding-large">
                                            <ReactMarkdown source={homepage.section_3_text}/>
                                        </div>
                                    </div>
                                </section>
                                <section className="hero--sub right">
                                    <div className="half">
                                        <div className="uk-padding-large">
                                            <img alt="quotes" className="quotes"
                                                 src="https://res.cloudinary.com/ia-interactive/image/upload/v1597007824/quote_kyjd9b.png"/>
                                            <ReactMarkdown source={homepage.section_4_text}/>
                                        </div>
                                    </div>
                                    <div className="half">
                                        <div className="logos"></div>
                                    </div>
                                </section>

                                <section className="mega-frame bottom" dangerouslySetInnerHTML={{__html: homepage.iframe_section_3_markdown}}></section>
                                <section className="mega-frame bottom" dangerouslySetInnerHTML={{__html: homepage.iframe_section_4_markdown}}></section>

                                <section className="hero--sub last-call">
                                    <div>
                                        <div>
                                            <h3>Over 150 million creators and brands love our technology.</h3>
                                            <p>Join Us <span uk-icon="icon: arrow-right; ratio: 1"></span></p>
                                        </div>
                                    </div>
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
