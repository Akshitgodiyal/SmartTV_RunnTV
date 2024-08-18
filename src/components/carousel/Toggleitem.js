import React, { useState } from "react";
import Focusable from "../../helper/Focusable";


const ToggleItem = (props) => {
  const [active, setActive] = useState(false);

  const assetClick = () => {
    const cc = localStorage.getItem("activeNav");
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


  const renderContent = () => {
    switch (props.type) {
      case "slider":
        return (
          <div   className={"item w-[100%] h-[688px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "Streaming":
        return (
          <div className={"item w-[240px] h-[320px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "Categories":
        return (
          <div className={"  item my-3 rounded-md w-[231.43px] h-[166px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "Genres":
        return (
          <div className={"  item my-3 rounded-md w-[254px] h-[166px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "Channels":
        return (
          <div className={"  item my-3 rounded-md w-[254px] h-[244px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "Language":
        return (
          <div className={"  item my-3 rounded-md w-[170px] h-[80px] " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      default:
        return (
          <div className={"item " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
    }
  };

  return (
    <Focusable
   
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
    >
      {renderContent()}
    </Focusable>
  );
};

export default ToggleItem;
