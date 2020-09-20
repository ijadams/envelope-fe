import React, {Component} from "react";
import Query from "../../components/Query";
import HOMEPAGE_QUERY from "../../queries/info/info";

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
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Homepage;
