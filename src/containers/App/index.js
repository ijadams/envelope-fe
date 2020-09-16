import React, {Component} from "react";

import { Switch, Route} from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Article from "../Article";
import Category from "../Category";
import Homepage from "../Homepage";
import AuthPage from "../AuthPage";
import ConnectPage from "../ConnectPage";
import NotFoundPage from "../NotFoundPage";
import {navService} from "../../services";
import PrivateRoute from '../../containers/PrivateRoute';

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
        this.usersub = navService.getUser().subscribe(data => {
            this.setState({
                user: data.user
            })
        });
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
        this.usersub.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                <div className={`${this.state.user == null ? "uk-hidden" : ""}`}>
                    <Nav />
                </div>
                <main className={`${this.state.loaded ? "uk-hidden" : ""}`}>
                    <Switch>
                        <PrivateRoute path="/" component={Homepage} exact />
                        <Route path="/auth/:authType/:id?" component={AuthPage} />
                        <Route exact path="/connect/:provider" component={ConnectPage} />
                        <PrivateRoute path="/article/:id" component={Article} exact />
                        <PrivateRoute path="/category/:id" component={Category} exact />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default App;
