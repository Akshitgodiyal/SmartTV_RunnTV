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
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
    >
      
      <div id={props.isFirstItem?"defaultFocused":""} className={"item " + (active ? "item-focus" : "")+" "+(props.isActiveIndex?"active":"")}>
      {props.icon? <img src={props.icon} alt="" />:""}
      {props.children}
      </div>
    </Focusable>
  );
};

export default ToggleItem;
