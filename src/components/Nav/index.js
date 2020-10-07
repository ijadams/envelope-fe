import React, {Component} from "react";
import {navService} from "../../services";
import {InfoOverlay} from "../InfoOverlay";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ArrowOverlay} from "../ArrowOverlay";

export class Nav extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
            visibile: false,
            scrolled: false
        }
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = navService.getNav().subscribe(data => {
            this.setState({
                active: data.active,
            })
        });

        this.subscription = navService.getArrow().subscribe(data => {
            this.setState({
                arrowActive: data.active,
            })
        });

        setTimeout(() => {
            this.setState({visibile: true});
        }, 2500);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        this.subscription.unsubscribe();
    }


    openNav = () => {
        navService.toggleNav(true);
    };

    closeNav = () => {
        navService.toggleNav(false);
    };

    openArrow = () => {
        navService.toggleArrow(true);
    };

    closeArrow = () => {
        navService.toggleArrow(false);
    };

    handleScroll = (event) => {
        this.setState({
            scrolled: window.scrollY !== 0
        });
    }

    render() {
        return (
            <nav className={`${this.state.visibile ? "visible" : ""}`}>
                <div className="info">
                    <div onClick={this.openNav}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                    </div>
                </div>
                <div className="title">
                    <div>
                        <h1>Envelope</h1>
                    </div>
                </div>
                <div className="arrow">
                    <div onClick={this.openArrow}>
                        <img src="https://ijadams.s3.amazonaws.com/envelope/chevron-desktop.png" alt="chevron"/>
                    </div>
                </div>

                <InfoOverlay active={this.state.active} />
                <ArrowOverlay active={this.state.arrowActive} />

            </nav>
        );
    }
}

export default Nav;
