import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import HorizontalList from "../../helper/HorizontalList";

import { VideoContext } from "../../utility/context";
import { globals } from "../../global";
import ToggleItem from "../ToogleItem";
import discover from "../../assets/images/discover.png";
import ControlToggle from "./ControlToggle";
import VerticalList from "../../helper/VerticalList";
import { mapChannel } from "../../helper/mapper/mapChannelEpg";
import downArrow from "../../assets/images/downArrow.png";
import ProgramDetail from "../programDetail.js/ProgramDetail";
import prevIcon from "../../assets/images/PreviousChannel.png";
import nextIcon from "../../assets/images/NextChannel.png";
const PlayerControls = ({ selectedAsset, setSelectedAsset }) => {
  const { isActive, setIsActive } = useContext(VideoContext);
  const { fullscreen, setFullscreen } = useContext(VideoContext);

  const { currentTime } = useContext(VideoContext);
  const { bufferedEnd } = useContext(VideoContext);
  const [previousChannel, setPreviousChannel] = useState(null);
  const [nextChannel, setNextChannel] = useState(null);
  const [value, setValue] = useState(0);

  const handleSetActive = (status) => {
    setIsActive(status);
  };
  const onFocus = (Control) => {
    handleSetActive(false);
    setFullscreen(false);
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

  useEffect(() => {
    const percentage = (currentTime / bufferedEnd) * 100;
    setValue(percentage);
  }, [currentTime, bufferedEnd]);
  const handleSeek = (time) => {
    const player = document.querySelector("video");
    player.currentTime = time;
  };
  const handleSeekChange = (e) => {
    const newTime = (e.target.value / 100) * bufferedEnd;
    setValue(e.target.value);
    handleSeek(newTime);
  };
 
  const handlefullscreen = () => {
    if (fullscreen == false) {
      setFullscreen(true);
     
    } else {
      setFullscreen(false);

     handleSetActive(true);
     let firstSectionRef = document.getElementById("defaultFocused");
     if (firstSectionRef) {
       localStorage.setItem("screenLoaded", true);
       firstSectionRef.click();
       localStorage.setItem("screenLoaded", false);
       localStorage.setItem(
         globals.ACTIVE_COMPONENT,
         globals.COMPONENT_NAME.Content
       );
      
     }
    }
  };

  return (
    <>
      <VerticalList
        onFocus={(index) =>
          onFocus( globals.COMPONENT_NAME.Player_Detail)
        }
        onBlur={(index) => handleSetActive(true, index)}
        className="w-full justify-center gap-3 items-center text-2xl flex"
        retainLastFocus={true}
        id={globals.COMPONENT_NAME.Player_Detail}
        style={{
          opacity: isActive ? 0 : fullscreen ? 0 : 1,
          zIndex: isActive ? -1 : fullscreen ? -1 : 1,
        }}
      >
        <ProgramDetail onBack={() => handlefullscreen()} />
      </VerticalList>
      <div
        style={{
          opacity: isActive ? 0 : fullscreen ? 0 : 1,
          zIndex: isActive ? -1 : fullscreen ? -1 : 1,
        }}
        className="flex justify-center absolute bottom-2 right-40  w-[80%] h-[16%] m-auto z-80"
      >
        <VerticalList>
          <HorizontalList
            onFocus={(index) =>
              onFocus(index, globals.COMPONENT_NAME.Player_Control)
            }
            onBlur={(index) => handleSetActive(true, index)}
            className="w-full justify-center gap-3 items-center text-2xl flex"
            retainLastFocus={true}
            id={globals.COMPONENT_NAME.Player_Control}
          >
            <div id="seekbar">
              <ToggleItem
                className=""
                onBack={() => handlefullscreen()}
                parentNav="seekbar"
              >
                {/* <input  type="range"  min="0"  max="100"  value={value} onChange={handleSeekChange} className="seek-bar"/> */}
                <div className="seek-bar">
                  <div className="filled" style={{ width: value + "%" }}></div>
                </div>
              </ToggleItem>
            </div>
          </HorizontalList>

          <HorizontalList
            onFocus={(index) =>
              onFocus(index, globals.COMPONENT_NAME.Player_Control)
            }
            onBlur={(index) => handleSetActive(true, index)}
            className="w-full justify-center gap-3 items-center text-2xl flex"
            retainLastFocus={true}
            id={globals.COMPONENT_NAME.Player_Control}
          >
            <div className="player-next-prev">
              <ToggleItem
                allowedDirection={"right"}
                parentId={globals.COMPONENT_NAME.Player_Control}
                disabled={previousChannel ? false : true}
                className={
                  previousChannel
                    ? "absolute bottom-10 left-[125px]"
                    : "disabled-button"
                }
                onEnter={() => setSelectedAsset(previousChannel)}
                onBack={() => handlefullscreen()}
              >
                <div className="channel-detail">
                  <div className="next-prev-title">
                    {previousChannel?.title ? previousChannel.title : ""}
                  </div>

                  <div className="next-prev-label">
                    <div className="prev">
                      <img
                        src={prevIcon}
                        alt={
                          previousChannel?.title ? previousChannel.title : ""
                        }
                      ></img>
                      Previous Channel
                    </div>
                  </div>
                </div>
                <div className="channel-image">
                  <img
                    src={
                      previousChannel
                        ? previousChannel.baseSourceLocation +
                          previousChannel.image.logo.tv
                        : ""
                    }
                    alt="runnTV_downArrow"
                  ></img>
                </div>
              </ToggleItem>
              <>
                <img
              
                  id="downArrow"
                  className="absolute 720p:bottom-5 bottom-10 1020p:w-15 720p:w-10"
                  src={downArrow}
                  alt="runnTV_downArrow"
                ></img>
              </>

              <ToggleItem
                allowedDirection={"left"}
                parentId={globals.COMPONENT_NAME.Player_Control}
                disabled={nextChannel ? false : true}
                className={
                  nextChannel
                    ? "absolute bottom-10 right-[110px]"
                    : "disabled-button"
                }
                onEnter={() => setSelectedAsset(nextChannel)}
                onBack={() => handlefullscreen()}
              >
                <div className="channel-image">
                  <img
                    src={
                      nextChannel
                        ? nextChannel.baseSourceLocation +
                          nextChannel.image.logo.tv
                        : ""
                    }
                    alt="runnTV_downArrow"
                  ></img>
                </div>
                <div className="channel-detail">
                  <div className="next-prev-title">
                    {nextChannel?.title ? nextChannel.title : ""}
                  </div>

                  <div className="next-prev-label">
                    <div className="next">
                      Next Channel
                      <img
                        src={nextIcon}
                        alt={nextChannel?.title ? nextChannel.title : ""}
                      ></img>
                    </div>
                  </div>
                </div>
              </ToggleItem>
            </div>
          </HorizontalList>
        </VerticalList>
      </div>
    </>
  );
};

export default PlayerControls;
