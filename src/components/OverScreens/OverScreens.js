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
      // Assuming there's a method to set focus to the first element in ContentCategory
      setTimeout(() => {
        let firstMenuRef = document.getElementById("firstMenuRef");
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
      <PlayerControls />
      {sidebarActive === "user" ? (
        <ContentCategory show={sidebarActive === "user"} setUrl={setUrl} />
      ) : sidebarActive === "search" ? (
        <DiscoverScreen show={sidebarActive === "search"} setUrl={setUrl} />
      ) : sidebarActive === "history" ? (
        <WatchHistory show={sidebarActive === "history"} setUrl={setUrl} />
      ) : sidebarActive === "star" ? (
        <Login show={sidebarActive === "star"} setUrl={setUrl} />
      ) : null}
    </>
  );
}

export default OverScreens;
