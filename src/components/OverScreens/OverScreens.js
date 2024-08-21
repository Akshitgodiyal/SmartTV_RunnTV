import React, { useContext, useEffect } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import DiscoverScreen from "../discoverScreen";
import WatchHistory from "../historyScreen";
import Login from "../login";
import PlayerControls from "../Player/PlayerControls";

function OverScreens({ setUrl }) {
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
      }, 0);
    }
  }, [sidebarActive]);

  return (
    <>
      {sidebarActive === "user" && (
        <>
          <PlayerControls />
          <ContentCategory show={true} setUrl={setUrl} />
        </>
      )}
      {sidebarActive === "search" && (
        <DiscoverScreen show={true} setUrl={setUrl} />
      )}
      {sidebarActive === "history" && (
        <WatchHistory show={true} setUrl={setUrl} />
      )}
      {sidebarActive === "star" && (
        <Login show={true} setUrl={setUrl} />
      )}
    </>
  );
}

export default OverScreens;
