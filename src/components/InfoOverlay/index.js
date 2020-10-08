import React from 'react';
import {navService} from "../../services";

export const InfoOverlay = (props) => {

    function closeNav() {
        navService.toggleNav(false);
    }

    return (
        <div className={`nav--overlay ${props.active ? "active" : ""}`}>
            <div className="close--container" onClick={closeNav} >
                <img src="https://ijadams.s3.amazonaws.com/envelope/info-black.png" alt="chevron"/>
            </div>
        </div>
    );
};
