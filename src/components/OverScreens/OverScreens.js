import React, { useContext, useEffect } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import DiscoverScreen from "../discoverScreen";
import WatchHistory from "../historyScreen";
import Login from "../login";
import PlayerControls from "../Player/PlayerControls";

function OverScreens({ setUrl,setPoster }) {
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
  if (sidebarActive === "tv") {
   
    return( 
    <>
      <PlayerControls />
    <ContentCategory show={sidebarActive === "tv"} setUrl={setUrl} setPoster={setPoster} />
    </>
  );
  } else if (sidebarActive === "discover") {
    return (
      <DiscoverScreen show={sidebarActive === "discover"} setUrl={setUrl}  setPoster={setPoster}/>
    );
  }
}

export default OverScreens;
