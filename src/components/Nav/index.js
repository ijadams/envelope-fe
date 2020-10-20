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
            scrolled: false,
            darkText: false
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

        this.subscriptionDarkText = navService.getDarkText().subscribe(data => {
            this.setState({
                darkText: data.darkText,
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
        this.subscriptionDarkText.unsubscribe();
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
        const xbc = 'https://ijadams.s3.amazonaws.com/envelope/chevron-desktop-black.png';
        const cb = 'https://ijadams.s3.amazonaws.com/envelope/x-white.png';
        const xb = 'https://ijadams.s3.amazonaws.com/envelope/x-black.png';
        const cw = 'https://ijadams.s3.amazonaws.com/envelope/chevron-desktop.png';
        const boutline = 'https://ijadams.s3.amazonaws.com/envelope/info-black-outline.png';
        const bfill = 'https://ijadams.s3.amazonaws.com/envelope/info-button-w-f.png';
        const overlayOpen = this.state.active || this.state.arrowActive;
        return (
            <div>
                <nav className={`${this.state.visible ? "visible" : ""} ${this.state.darkText ? "dark--text" : ""}`}>
                    <div className="info">
                        <div onClick={this.openNav}>
                            {this.state.darkText && <img src={this.state.active ? bfill : boutline} alt="chevron"/>}
                            {!this.state.darkText && <img src={this.state.active ? b : w} alt="chevron"/>}
                        </div>
                    </div>
                    <div className={`title ${overlayOpen ? "hidden" : ""}`}>
                        <div>
                            <h1>Envelope</h1>
                        </div>
                    </div>
                    <div className="arrow">
                        <div onClick={this.openArrow}>
                            {this.state.darkText && <img src={this.state.arrowActive ? xb : xbc} alt="chevron"/>}
                            {!this.state.darkText && <img src={this.state.arrowActive ? cb : cw} alt="chevron"/>}
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
