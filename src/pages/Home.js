import React, { useRef } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, { HorizontalList, VerticalList } from "../helper/react-navigation.js";
import HlsPlayer from "../components/Player/HlsPlayer.js";

const Home = () => {
  const playerRef = useRef(null);

  localStorage.setItem("activeNav", "home-div-nav");

  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
              <HlsPlayer  />
      
            
              <ContentCategory  />
                
              
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
