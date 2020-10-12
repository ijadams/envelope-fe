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
        navService.toggleNav(!this.state.active);
        navService.toggleArrow(false);
    };

    openArrow = () => {
        navService.toggleArrow(!this.state.arrowActive);
        navService.toggleNav(false);
    };

    handleScroll = (event) => {
        this.setState({
            scrolled: window.scrollY !== 0
        });
    };

    render() {
        const w = 'https://ijadams.s3.amazonaws.com/envelope/info-white.png';
        const b = 'https://ijadams.s3.amazonaws.com/envelope/info-black.png';
        const cb = 'https://ijadams.s3.amazonaws.com/envelope/chevron-desktop-black.png';
        const cw = 'https://ijadams.s3.amazonaws.com/envelope/chevron-desktop.png';
        const overlayOpen = this.state.active || this.state.arrowActive;
        return (
            <div>
                <nav className={`${this.state.visible ? "visible" : ""}`}>
                    <div className="info">
                        <div onClick={this.openNav}>
                            <img src={overlayOpen ? b : w} alt="chevron"/>
                        </div>
                    </div>
                    <div className={`title ${overlayOpen ? "hidden" : ""}`}>
                        <div>
                            <h1>Envelope</h1>
                        </div>
                    </div>
                    <div className="arrow">
                        <div onClick={this.openArrow}>
                            <img src={overlayOpen ? cb : cw} alt="chevron"/>
                        </div>
                    </div>
                </nav>
                <InfoOverlay active={this.state.active}/>
                <ArrowOverlay active={this.state.arrowActive}/>
            </div>
        );
    }
}

export default Nav;
