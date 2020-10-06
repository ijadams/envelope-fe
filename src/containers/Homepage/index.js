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
        const settings = {
            dots: true,
            infinite: true,
            fade: true,
            speed: 500,
            lazyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: true
        };

        const url = process.env.NODE_ENV !== "development" ? process.env.REACT_APP_BACKEND_URL : '';

        return (
            <div>
                <Query query={PROJECTS_QUERY}>
                    {({data: {projects}}) => {
                        return (
                            <div>
                                <section id="projects">
                                    {projects.map((p, i) => {
                                        return <Project data={p} url={url} settings={settings} key={i}></Project>
                                    })}
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
