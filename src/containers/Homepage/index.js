import React, {Component} from "react";
import Query from "../../components/Query";
import HOMEPAGE_QUERY from "../../queries/homepage/homepage";

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
                                <h1>{homepage.herotext}</h1>
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Homepage;
