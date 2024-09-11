import React, { useState } from "react";
import Focusable from "../../helper/Focusable";
import discover from "../../assets/images/discover.png";
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
    localStorage.setItem(globals.ACTIVE_COMPONENT, "scroll-data");
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
            id="datasection"
            className={
              "item m-5 text-[32px] text-white " +
              (active ? "item-focus text-white text-[32px]" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
            }
          >
            {props.children}
          </div>
        );
      case "button":
        return (
          <div
            className={
              "w-[max-content] flex justify-start items-center categories  py-2 px-4 bg-transparent " +
              (active ? "item-focus" : "") +
              " " +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <div className="text-[24px] text-white">{props.children}</div>
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
      onFocus={() =>{ setActive(true); onKeyDown()}}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
      onBack ={()=>props.onBack()}
    >
      {renderContent()}
    </Focusable>
  );
};

export default ControlToggle;
