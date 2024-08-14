import React, { useContext } from "react";
import HorizontalList from "../../helper/HorizontalList";
import ToggleItem from "../ToogleItem"; // Fix the import if needed
import { VideoContext } from "../../utility/context";
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
        <ToggleItem className="bg-blue-900" icon="user">
         
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
