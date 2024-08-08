
import React, { useRef, useContext, useState } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, { HorizontalList, VerticalList } from "../helper/react-navigation.js";
import HlsPlayer from "../components/Player/HlsPlayer.js";
import PlayerControls from "../components/Player/PlayerControls";
import { VideoContext } from "../utility/context.js";
import Player from "../components/Player/Player.js";

const Home = () => {
  
  const playerRef = useRef(null);
  const [url, setUrl] = useState("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8");
 

  localStorage.setItem("activeNav", "home-div-nav");

  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
            <Player url={url} ref={playerRef} />
         
              <ContentCategory setUrl={setUrl} />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;