import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="social">
                    <ul>
                        <li>
                        <span
                            uk-icon="icon: facebook; ratio: 2"></span>
                        </li>
                        <li>
                        <span
                            uk-icon="icon: twitter; ratio: 2"></span>
                        </li>
                        <li>
                        <span
                            uk-icon="icon: linkedin; ratio: 2"></span>
                        </li>
                        <li>
                        <span
                            uk-icon="icon: youtube; ratio: 2"></span>
                        </li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>© 2020 4 Forty Media, Inc. All rights reserved.Terms, Privacy, CA Privacy, Copyright, & Cookies</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
