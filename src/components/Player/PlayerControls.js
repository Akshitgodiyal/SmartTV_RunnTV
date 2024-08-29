import React, { useContext, useState } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import { globals } from "../../global";
import ToggleItem from "../ToogleItem";
import discover from "../../assets/images/discover.png";
import ControlToggle from "./ControlToggle";
import VerticalList from "../../helper/VerticalList";
const PlayerControls = () => {
  const { isActive, setIsActive } = useContext(VideoContext);
  const handleSetActive = (status, index) => {
    setIsActive(status);
  };
  const onFocus = (index,Control) => {
    handleSetActive(false, index);
    console.log(Control);
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      Control
    );
  };


  return (
    <>
    <div  >

    <VerticalList
          onFocus={(index) => onFocus(index,globals.COMPONENT_NAME.Player_Detail)}
          onBlur={(index) => handleSetActive(true, index)}
          retainLastFocus={true}
          id={globals.COMPONENT_NAME.Player_Detail}
          className="bg-black bg-opacity-60 w-[100vh] h-[100vh]"

    >


   
 
      <div
        style={{
          opacity: isActive ? 0 : 1,
          zIndex: isActive ? -1 : 1,
        }}
        className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[10%] m-auto z-80"
      >
        <HorizontalList
       onFocus={(index) => onFocus(index,globals.COMPONENT_NAME.Player_Control)}
          onBlur={(index) => handleSetActive(true, index)}
          retainLastFocus={true}
          className="w-full justify-center gap-3 items-center text-2xl flex"
          id={globals.COMPONENT_NAME.Player_Control}
        >
          <ControlToggle type={"PlayerControl"} className="bg-blue-900">
            {" "}
            Menu 1{" "}
          </ControlToggle>
          <ControlToggle type={"PlayerControl"} className="bg-blue-900">
            {" "}
            Menu 2{" "}
          </ControlToggle>
          <ControlToggle type={"PlayerControl"} className="bg-blue-900">
            Menu 3
          </ControlToggle>
        </HorizontalList>
      </div>
      </VerticalList>
    </div>
    </>
  );
};

export default PlayerControls;
