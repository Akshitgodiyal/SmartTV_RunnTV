import React, { useState } from "react";
import Focusable from "../../helper/Focusable";
import { globals } from "../../global";
const ControlToggle = (props) => {
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
      props.onEnter(); // Call the passed callback function
    }
  };

  const renderContent = () => {
    switch (props.type) {
      case "PlayerControl":
        return (
          <div
            className={
              "item " +
              (active ? "item-focus" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
            + " "+ props.className
            }
          >
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
      case "detaildata":
        return (
          <div
            className={
              "w-[max-content] flex justify-start items-center categories  py-2 px-4 bg-transparent " +
              (active ? "item-focus" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
              + " "+ props.className
            }
            
          >
              <img className="control-toggle__icon" src={props.image} />
              <div className="control-toggle__text">{props.children}</div>
          </div>
        );

      default:
        return (
          <div
            className={
              "w-[max-content] flex justify-start items-center categories  py-2 px-4 bg-transparent " +
              (active ? "item-focus" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
            }
          >
           <img className="control-toggle__icon" src={props.image} />
           <div className="control-toggle__text">{props.children}</div>
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
      onBack={() => props.onBack()}
      disabled={props.disabled}
      parentId={globals.COMPONENT_NAME.Player_Control}
      name={props.children}
    >
      {renderContent()}
    </Focusable>
  );
};

export default ControlToggle;
