import React, { useContext, useState } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import { globals } from "../../global";
import ToggleItem from "../ToogleItem";
const PlayerControls = () => {
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

  return (
    <div className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[10%] m-auto z-80">
      <HorizontalList
        onFocus={(index) => onFocus(index)}
        onBlur={(index) => handleSetActive(true, index)}
        className="w-full justify-center gap-3 items-center text-2xl flex"
        retainLastFocus={true}
        id={globals.COMPONENT_NAME.Player_Control}
      >
        <ToggleItem className="bg-blue-900"> Menu 1 </ToggleItem>
        <ToggleItem className="bg-blue-900"> Menu 2 </ToggleItem>
        <ToggleItem className="bg-blue-900">Menu 3</ToggleItem>
      </HorizontalList>
    </div>
  );
};

export default PlayerControls;
