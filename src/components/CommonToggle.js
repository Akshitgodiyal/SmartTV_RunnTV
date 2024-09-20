import React, { useState } from "react";
import Focusable from "../helper/Focusable";



const CommonToggle = (props) => {
  const [active, setActive] = useState(false);

  const assetClick = () => {
  

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
          id={props.logincomp}
            className={
              " w-[max-content] flex justify-start items-center categories  bg-transparent " +
              (active ? "item-focus" : "items") +
              " " +
              (props.isActiveIndex ? "active" : "")
            }
          >
           
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

export default CommonToggle;
