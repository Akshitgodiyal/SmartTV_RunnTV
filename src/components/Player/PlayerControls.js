import React, { useContext, useState } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import Focusable from "../../helper/Focusable";

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
      <div id={props.id}  className={"item " + (active ? "item-focus" : "")+" "+(props.isActiveIndex?"active":"")}>
        <i className={"fa fa-" + props.icon} /> {props.children}
      </div>
    </Focusable>
  );
};




const PlayerControls = () => {
  const { isActive, setIsActive } = useContext(VideoContext);
  const handleSetActive = (status, index) => {
    setIsActive(status);
  };
  const onFocus = (index) => {
    handleSetActive(false, index);
    localStorage.setItem("ACTIVE_COMPONENT","player-controls");
  };

  return (
    <div className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[10%] m-auto z-80">
      <HorizontalList
        onFocus={(index) => onFocus(index)}
        onBlur={(index) => handleSetActive(true, index)}
        className="w-full justify-center gap-3 items-center text-2xl flex"
        retainLastFocus={true}
        id="player-controls"
      >
        <ToggleItem   id="playercontrol" className="bg-blue-900" icon="user">
         
          Menu 1
        </ToggleItem>
        <ToggleItem className="bg-blue-900" icon="user">
          {" "}
          Menu 2{" "}
        </ToggleItem>
        <ToggleItem icon="user">Menu 3</ToggleItem>
      </HorizontalList>
    </div>
  );
};

export default PlayerControls;
