import React, { useState } from "react";
import Navigation, { Focusable } from "../helper/react-navigation.js";

const ToggleItem = (props) => {
  const [active, setActive] = useState(false);

  const assetClick = () => {
    var cc = localStorage.getItem("activeNav");
    if (cc !== props.parentNav) {
      return;
    }
 
    if (props.onClick) {
      props.onClick(props.assetinfo);
    }
  };

  const onKeyDown = () => {
    assetClick();
    if (props.onEnter) {
      props.onEnter();  // Call the passed callback function
    }
  };

  return (
    <Focusable
    forceFocus={props.index == 0 && props.forceFocus}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
    >
      <div className={"item " + (active ? "item-focus" : "")+" "+(props.isActiveIndex?"active":"")}>
        <i className={"fa fa-" + props.icon} /> {props.children}
      </div>
    </Focusable>
  );
};

export default ToggleItem;
