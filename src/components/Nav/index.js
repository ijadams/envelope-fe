import React, {Component} from "react";
import {navService} from "../../services";
import {InfoOverlay} from "../InfoOverlay";
import {ArrowOverlay} from "../ArrowOverlay";

export class Nav extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
            arrowActive: false,
            visible: false,
            scrolled: false
        }
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscriptionNav = navService.getNav().subscribe(data => {
            this.setState({
                active: data.active,
            })
        });

        this.subscriptionArrow = navService.getArrow().subscribe(data => {
            this.setState({
                arrowActive: data.arrowActive,
            })
        });


        setTimeout(() => {
            this.setState({visible: true});
        }, 2500);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        this.subscriptionArrow.unsubscribe();
        this.subscriptionNav.unsubscribe();
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
            <nav className={`${this.state.visible ? "visible" : ""}`}>
                <div className="info">
                    <div onClick={this.openNav}>
                        <img src="https://ijadams.s3.amazonaws.com/envelope/info-white.png" alt="chevron"/>
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

                <InfoOverlay active={this.state.active}/>
                <ArrowOverlay active={this.state.arrowActive}/>
            </nav>
        );
    }
}

export default Nav;
