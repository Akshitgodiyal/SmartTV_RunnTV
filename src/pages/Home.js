import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, { HorizontalList, VerticalList } from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";


const Home = () => {
  const [url, setUrl] = useState("");
  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
              <Player url={url}  />
              <OverScreens setUrl={setUrl}  />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
