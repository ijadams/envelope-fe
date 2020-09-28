import React, {Component} from "react";
import {navService} from "../../services";

export class Nav extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
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
            <div>
                {/*<Query query={NAV_QUERY} id={null}>*/}
                {/*    {({data: {nav, categories}}) => {*/}
                {/*        const desktopimageUrlImageUrl =*/}
                {/*            process.env.NODE_ENV !== "development"*/}
                {/*                ? nav.navlogo.url*/}
                {/*                : process.env.REACT_APP_BACKEND_URL + nav.navlogo.url;*/}
                {/*        const mobileImageUrl =*/}
                {/*            process.env.NODE_ENV !== "development"*/}
                {/*                ? nav.navlogomobile.url*/}
                {/*                : process.env.REACT_APP_BACKEND_URL + nav.navlogomobile.url;*/}
                {/*        ;*/}
                {/*        return (*/}
                {/*            <div>*/}
                {/*                <nav className={`uk-navbar-container ${this.state.scrolled ? "active" : ''}`}*/}
                {/*                     data-uk-navbar>*/}
                {/*                    <div className="uk-navbar-left">*/}
                {/*                        <ul className="uk-navbar-nav">*/}
                {/*                            <li className="desktop">*/}
                {/*                                <Link to="/"><img alt="Envelope Logo"*/}
                {/*                                                  src={desktopimageUrlImageUrl}/></Link>*/}
                {/*                            </li>*/}
                {/*                            <li className="mobile">*/}
                {/*                                <Link to="/"><img alt="Envelope Logo" src={mobileImageUrl}/></Link>*/}
                {/*                            </li>*/}
                {/*                        </ul>*/}
                {/*                    </div>*/}

                {/*                    <div className="uk-navbar-right desktop">*/}
                {/*                        <ul className="uk-navbar-nav">*/}
                {/*                            {categories.map((category, i) => {*/}
                {/*                                return (*/}
                {/*                                    <li key={category.id}>*/}
                {/*                                        <Link*/}
                {/*                                            to={`/category/${category.id}`}*/}
                {/*                                            className="uk-link-reset"*/}
                {/*                                        >*/}
                {/*                                            {category.name}*/}
                {/*                                        </Link>*/}
                {/*                                    </li>*/}
                {/*                                );*/}
                {/*                            })}*/}
                {/*                        </ul>*/}
                {/*                    </div>*/}

                {/*                    <div className="uk-navbar-right mobile">*/}
                {/*                        <div className={`nav--button ${this.state.active ? "uk-hidden" : ""}`}*/}
                {/*                             onClick={this.openNav}><span uk-icon="icon: menu; ratio: 2"></span>*/}
                {/*                        </div>*/}
                {/*                        <div className={`nav--button ${this.state.active ? "" : "uk-hidden"}`}*/}
                {/*                             onClick={this.closeNav}><span*/}
                {/*                            uk-icon="icon: close; ratio: 2"></span>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className={`nav--overlay ${this.state.active ? "active" : ""}`}>*/}
                {/*                        <ul>*/}
                {/*                            {categories.map((category, i) => {*/}
                {/*                                return (*/}
                {/*                                    <li key={category.id}>*/}
                {/*                                        <Link*/}
                {/*                                            to={`/category/${category.id}`}*/}
                {/*                                            className="uk-link-reset"*/}
                {/*                                        >*/}
                {/*                                            {category.name}*/}
                {/*                                        </Link>*/}
                {/*                                    </li>*/}
                {/*                                );*/}
                {/*                            })}*/}
                {/*                        </ul>*/}
                {/*                    </div>*/}
                {/*                </nav>*/}
                {/*            </div>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*</Query>*/}
            </div>
        );
    }
}

export default Nav;
