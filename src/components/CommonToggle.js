import React, { useState } from "react";
import Focusable from "../helper/Focusable";



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
    console.log("onKeyDown");
    
    assetClick();
    if (props.onEnter) {
      props.onEnter(); // Call the passed callback function
    }
  };

  const renderContent = () => {
    switch (props.type) {
      case "data":
        return (
          <div
            id={props.logincomp}
            className={
              "item " +
              (active ? "item-focus text-white text-[32px]" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
            }
          >
            {props.children}
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
            <img className="w-[24px] mr-[16px]" src={props?.images} />
            <div className="text-[24px] text-white">{props.children}</div>
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
    >
      {renderContent()}
    </Focusable>
  );
};

export default ControlToggle;
