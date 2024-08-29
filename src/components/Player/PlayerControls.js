import React, { useContext, useState,useEffect } from "react";
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
  // useEffect(()=>{
  //   console.log(selectedAsset)
  //  debugger;
  // },[selectedAsset])

  return (
<div
        style={{
          opacity: isActive ? 0 : 1,
          zIndex: isActive ? -1 : 1,
        }}
        className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[10%] m-auto z-80"
      >
     
     <VerticalList>
     <HorizontalList
       onFocus={(index) => onFocus(index,globals.COMPONENT_NAME.Player_Control)}
          onBlur={(index) => handleSetActive(true, index)}
          retainLastFocus={true}
          className="w-full justify-center gap-3 items-center text-2xl flex"
          id={globals.COMPONENT_NAME.Player_Control}
        >
        <ToggleItem className="bg-blue-900">Seek Bar </ToggleItem>
      
<>
    {/* {selectedAsset.previousChannel && (
        <ToggleItem
            className="bg-blue-900"
            onEnter={() => setSelectedAsset(selectedAsset.previousChannel)}
        >
            Prev
        </ToggleItem>
    )}

    {selectedAsset.nextChannel && (
        <ToggleItem
            className="bg-blue-900"
            onEnter={() => setSelectedAsset(selectedAsset.nextChannel)}
        >
            Next
        </ToggleItem>
    )} */}
</>
        </HorizontalList>
     </VerticalList>
      
    </div>
   
  );
};

export default PlayerControls;
