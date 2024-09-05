import React, { useContext, useEffect } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import DiscoverScreen from "../discoverScreen";
import WatchHistory from "../historyScreen";
import Login from "../login";
import PlayerControls from "../Player/PlayerControls";
import PrivacyPage from "../privacy/privacyPage";


function OverScreens({selectedAsset, setSelectedAsset,bufferedEnd,onSeek }) {
  const { sidebarActive } = useContext(VideoContext);

  useEffect(() => {
    if (sidebarActive === "user") {
      setTimeout(() => {
        const firstMenuRef = document.getElementById("firstMenuRef");
        if (firstMenuRef) {
          localStorage.setItem("screenLoaded", true);
          firstMenuRef.click();
          localStorage.setItem("screenLoaded", false);
        }
      }, 20);
    }
  }, [sidebarActive]);




  if (sidebarActive == "tv") {
   
    return( 
    <>
      <PlayerControls selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} bufferedEnd={bufferedEnd}
                
                onSeek={onSeek} />




      <ContentCategory show={sidebarActive === "tv"} setSelectedAsset={setSelectedAsset} />
    </>
  );
  } 
  else if (sidebarActive === "discover") {
    return (
      <DiscoverScreen show={sidebarActive === "discover"} setSelectedAsset={setSelectedAsset}/>
    );
  }
  else if (sidebarActive === "search") {
    return (
      <PrivacyPage show={sidebarActive == "search"} />
    );
  }
  else if (sidebarActive === "login") {
    return (
      <Login show={sidebarActive == "login"} />
    );
  }
}
export default OverScreens;
