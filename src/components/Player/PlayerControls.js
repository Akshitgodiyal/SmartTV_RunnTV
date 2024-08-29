import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import { globals } from "../../global";
import ToggleItem from "../ToogleItem";
import discover from "../../assets/images/discover.png";
import ControlToggle from "./ControlToggle";
import VerticalList from "../../helper/VerticalList";
import { mapChannel } from "../../helper/mapper/mapChannelEpg";
const PlayerControls = ({ selectedAsset, setSelectedAsset }) => {
  const { isActive, setIsActive } = useContext(VideoContext);
  const [previousChannel, setPreviousChannel] = useState(null);
  const [nextChannel, setNextChannel] = useState(null);
  const handleSetActive = (status, index) => {
    setIsActive(status);
  };
  const onFocus = (index, Control) => {
    handleSetActive(false, index);
    localStorage.setItem(globals.ACTIVE_COMPONENT, Control);
  };
  useLayoutEffect(() => {
    if (selectedAsset) {
      var getCategoryResult = localStorage.getItem("filterCategoryResult")
        ? JSON.parse(localStorage.getItem("filterCategoryResult"))
        : null;
      if (getCategoryResult) {
        getCategoryResult[selectedAsset.previousChannelIndex]
          ? setPreviousChannel(
              getCategoryResult[selectedAsset.previousChannelIndex]
            )
          : setPreviousChannel();
        getCategoryResult[selectedAsset.nextChannelIndex]
          ? setNextChannel(getCategoryResult[selectedAsset.nextChannelIndex])
          : setNextChannel();
      }
    }
  }, [selectedAsset]);

  return (
    <div
      style={{ opacity: isActive ? 0 : 1, zIndex: isActive ? -1 : 1 }}
      className="flex justify-center absolute bottom-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[20%] m-auto z-80"
    >
      <VerticalList>
        <HorizontalList
          onFocus={(index) => onFocus(index, globals.COMPONENT_NAME.Player_Control)}
          onBlur={(index) => handleSetActive(true, index)}
          className="w-full justify-center gap-3 items-center text-2xl flex"
          retainLastFocus={true}
          id={globals.COMPONENT_NAME.Player_Control}
        >
          <ToggleItem className="bg-blue-900">Seek Bar </ToggleItem>
        </HorizontalList>
        <HorizontalList
          onFocus={(index) => onFocus(index, globals.COMPONENT_NAME.Player_Control)}
          onBlur={(index) => handleSetActive(true, index)}
          className="w-full justify-center gap-3 items-center text-2xl flex"
          retainLastFocus={true}
          id={globals.COMPONENT_NAME.Player_Control}
        >
          <>
            <ToggleItem
              allowedDirection={"right"}
              parentId={globals.COMPONENT_NAME.Player_Control}
              disabled={previousChannel ? false : true}
              className={
                previousChannel
                  ? "absolute bottom-10 left-[100px]"
                  : "disabled-button"
              }
              onEnter={() => setSelectedAsset(previousChannel)}
            >
              Prev
            </ToggleItem>
            <ToggleItem
              allowedDirection={"left"}
              parentId={globals.COMPONENT_NAME.Player_Control}
              disabled={nextChannel ? false : true}
              className={
                nextChannel
                  ? "absolute bottom-10 right-[100px]"
                  : "disabled-button"
              }
              onEnter={() => setSelectedAsset(nextChannel)}
            >
              Next{" "}
            </ToggleItem>
          </>
        </HorizontalList>
      </VerticalList>
    </div>
  );
};

export default PlayerControls;
