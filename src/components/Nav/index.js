import React, {Component} from "react";
import {navService} from "../../services";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                active: data.active
            })
        });

        setTimeout(() => {
            window.addEventListener('scroll', this.handleScroll);
        }, 300);

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

    handleScroll = (event) => {
        this.setState({
            scrolled: window.scrollY !== 0
        });
    }

    render() {
        return (
            <nav className={`${this.state.visibile ? "visible" : ""}`}>
                <div className="info">
                    <div>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                </div>
                <div className="title">
                    <div>
                        <h1>Envelope</h1>
                    </div>
                </div>
                <div className="arrow">
                    <div>
                        <img src="https://ijadams.s3.amazonaws.com/envelope/chevron-desktop.png" alt="chevron"/>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
