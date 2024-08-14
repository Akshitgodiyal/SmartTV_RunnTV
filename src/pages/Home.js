import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, { HorizontalList, VerticalList } from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";


const Home = () => {
  const playerRef = useRef(null);
  const [url, setUrl] = useState("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8");

  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
              <Player url={url} ref={playerRef} />
              <OverScreens setUrl={setUrl} />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
