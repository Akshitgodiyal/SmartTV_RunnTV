import React, { useContext, useState,useEffect } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import { globals } from "../../global";
import ToggleItem from "../ToogleItem";
import VerticalList from "../../helper/VerticalList";
const PlayerControls = ({selectedAsset,setSelectedAsset}) => { 
  const { isActive, setIsActive } = useContext(VideoContext); 
  const handleSetActive = (status, index) => {
    setIsActive(status);
  };
  const onFocus = (index) => {
    handleSetActive(false, index);
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Player_Control
    );
  };
  useEffect(()=>{
    console.log(selectedAsset)
   debugger;
  },[selectedAsset])

  return (
    <div style={{ opacity: isActive ? 0 : 1,  zIndex: isActive  ? -1 : 1, }} className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[20%] m-auto z-80">
     
     <VerticalList>
        <HorizontalList 
        onFocus={(index) => onFocus(index)}
        onBlur={(index) => handleSetActive(true, index)}
        className="w-full justify-center gap-3 items-center text-2xl flex"
        retainLastFocus={true}
        id={globals.COMPONENT_NAME.Player_Control}
        >
        <ToggleItem className="bg-blue-900">Seek Bar </ToggleItem>
        </HorizontalList>
        <HorizontalList 
        onFocus={(index) => onFocus(index)}
        onBlur={(index) => handleSetActive(true, index)}
        className="w-full justify-center gap-3 items-center text-2xl flex"
        retainLastFocus={true}
        id={globals.COMPONENT_NAME.Player_Control}
        >
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
