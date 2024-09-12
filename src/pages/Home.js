import React, { useRef, useEffect, useState, useContext } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, {
  HorizontalList,
  VerticalList,
} from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";
import { mapChannel } from "../helper/mapper/mapChannelEpg.js";
import { VideoContext } from "../utility/context.js";
import { globals } from "../global.js";

const Home = () => { 

  const { setSelectedAsset } = useContext(VideoContext);
  const { setsidebarActive } = useContext(VideoContext);
  const { setActiveIndex } = useContext(VideoContext);
  const { setIsActive } = useContext(VideoContext);
  const {  setFullscreen } = useContext(VideoContext);
  const showVideoSlider = () => {
    setFullscreen(false)
    setIsActive(false)
    setActiveIndex(1)
    setsidebarActive("tv")
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Sidebar
    );
    setTimeout(() => {
      let datasection = document.getElementById("seekbarref");

      if (datasection) {
        localStorage.setItem("screenLoaded", true);
        datasection.click();
        localStorage.setItem("screenLoaded", false);
      }
    }, 200);
  }

  useEffect(() => {
    var getCategoryResult = localStorage.getItem("filterCategoryResult")
      ? JSON.parse(localStorage.getItem("filterCategoryResult"))
      : null;
    if (getCategoryResult) {  
      setSelectedAsset(getCategoryResult[0]);
    }
  }, []);


  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
              <Player 
                // onBufferUpdate={handleBufferUpdate}
                 />
              <OverScreens backtohome={()=>showVideoSlider()} 
                 
               
                  // onSeek={handleSeek}
              />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
