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
            navActive: false,
            arrowActive: false,
            darkText: false,
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
        this.subscriptionDarkText = navService.getDarkText().subscribe(data => {
            this.setState({
                darkText: data.darkText,
            })
        });
    }

    componentWillUnmount() {
        this.navsub.unsubscribe();
        this.arrowsub.unsubscribe();
        this.subscriptionDarkText.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                {window.location.pathname === '/' && <Nav/>}
                <main>
                    <Switch>
                        <Route path="/" component={Homepage} exact/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Cursor active={this.state.navActive || this.state.arrowActive} darkText={this.state.darkText}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
