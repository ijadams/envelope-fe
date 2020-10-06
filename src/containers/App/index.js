import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {Cursor} from "../../components/Cursor"
import Homepage from "../Homepage";
import NotFoundPage from "../NotFoundPage";
import {navService} from "../../services";

export class App extends Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            user: null
        }
    }

    componentDidMount() {
        // subscribe to home component messages
        this.navsub = navService.getNav().subscribe(data => {
            this.setState({
                loaded: data.active
            })
        });
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                <Nav/>
                <main className={`${this.state.loaded ? "uk-hidden" : ""}`}>
                    <Switch>
                        <Route path="/" component={Homepage} exact/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Cursor/>
                <Footer/>
            </div>
        );
    }
}

export default App;
