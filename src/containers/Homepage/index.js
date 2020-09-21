import React, {Component} from "react";
import Query from "../../components/Query";
import INFO_QUERY from "../../queries/info/info";

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
                <Query query={INFO_QUERY} id={null}>
                    {({data: {info}}) => {
                        return (
                            <div>
                                {info.top}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default Homepage;
