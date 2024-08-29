import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, {
  HorizontalList,
  VerticalList,
} from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";
import { mapChannel } from "../helper/mapper/mapChannelEpg.js";

const Home = () => { 
  const [selectedAsset, setSelectedAsset] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
};

const handleBufferUpdate = (bufferEnd) => {
    setBufferedEnd(bufferEnd);
};

const handleSeek = (time) => {
    const player = document.querySelector('video');
    player.currentTime = time;
};
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
              <Player selectedAsset={selectedAsset} onTimeUpdate={handleTimeUpdate}
                onBufferUpdate={handleBufferUpdate} />
              <OverScreens selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}
                  bufferedEnd={bufferedEnd}
                  currentTime={currentTime}
                  onSeek={handleSeek}
              />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
