import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {navService} from "../../services";

export const InfoOverlay = (props) => {

    function closeNav() {
        navService.toggleNav(false);
    }

    return (
        <div className={`nav--overlay ${props.active ? "active" : ""}`}>
            <div className="close--container" onClick={closeNav} >
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    );
};
