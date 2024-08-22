import React, { useState } from "react";
import Navigation, { Focusable } from "../helper/react-navigation.js";
import { img_cloudfront } from "../utility/constant.js";
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
  console.log(props);
  return ( 
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
    >
      <div id={props.isFirstItem?"defaultFocused":""} className={"item " + (active ? "item-focus" : "")+" "+(props.isActiveIndex?"active":"")}>
      {props.images? <img src={active?img_cloudfront+ props.images.enabledIcon.tv:img_cloudfront+props.images.disabledIcon.tv} alt={props.children} />:""}
      {props.children}
      </div>
    </Focusable>
  );
};

export default ToggleItem;
