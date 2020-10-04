import React from "react";
import { withNavigationContext } from "react-awesome-slider/dist/navigation";

const Content = withNavigationContext(({ fullpage, main, action }) => {
    return (
        <div className="content">
        </div>
    );
});

export default Content;
