import React, {useState, useEffect} from 'react';
import classNames from 'classnames';


export const isMobileAgent = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
};

export const Cursor = (props) => {

    const isMobile = /Android|Mobi/i.test(navigator.userAgent);

    const [position, setPosition] = useState({x: 0, y: 0});
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [hidden, setHidden] = useState(false);

    if (typeof navigator !== "undefined" && isMobile) {
        return (
            <div></div>
        );
    }

    const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
    };

    /* eslint-disable */

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        return () => removeEventListeners();
    }, []);

    /* eslint-enable */


    const onMouseMove = (e) => {
        setPosition({x: e.clientX, y: e.clientY});
    };

    const onMouseDown = () => {
        setClicked(true);
    };

    const onMouseUp = () => {
        setClicked(false);
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const handleLinkHoverEvents = () => {
        document.querySelectorAll("a").forEach((el) => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

    const cursorClasses = classNames("cursor", {
        "cursor--clicked": clicked,
        "cursor--hidden": hidden,
        "cursor--link-hovered": linkHovered,
        "active": props.active,
        "dark--text": props.darkText
    });

    return (
        <div
            className={cursorClasses}
            style={{left: `${position.x}px`, top: `${position.y}px`}}
        />
    );
};
