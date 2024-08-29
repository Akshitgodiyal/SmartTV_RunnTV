import React, { useState } from "react";
import Focusable from "../../helper/Focusable";
import discover from "../../assets/images/discover.png";

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
      props.onEnter();  // Call the passed callback function
    }
  };


  const renderContent = () => {
    switch (props.type) {
      case "PlayerControl":
        return (
            <div className={"item " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
      
        );
      case "detaildata":
        return (
            <div className={"w-[max-content] flex justify-start items-center categories  py-2 px-4 bg-transparent " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
            <img className="w-[24px] mr-[16px]" src={discover} />
             <div className="text-[24px] text-white">
 
             {props.children}
 </div>
           </div>
        );
    
      default:
        return (
          <div className={"w-[max-content] flex justify-start items-center categories  py-2 px-4 bg-transparent " + (active ? "item-focus" : "") + " " + (props.isActiveIndex ? "active" : "")}>
           <img className="w-[24px] mr-[16px]" src={props?.images} />
            <div className="text-[24px] text-white">

            {props.children}
</div>
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

export default ControlToggle;
