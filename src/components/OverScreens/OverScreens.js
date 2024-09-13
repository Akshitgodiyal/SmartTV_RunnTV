import React, { useContext, useEffect } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import DiscoverScreen from "../discoverScreen";
import WatchHistory from "../historyScreen";
import Login from "../login";
import PlayerControls from "../Player/PlayerControls";
import PrivacyPage from "../privacy/privacyPage";
import { globals } from "../../global";

function OverScreens({ backtohome }) {
  const { sidebarActive } = useContext(VideoContext);

  console.log("ASdasdhask");

  useEffect(() => {
    if (sidebarActive === "tv") {
      setTimeout(() => {
        const firstMenuRef = document.getElementById("defaultFocused");

        if (firstMenuRef) {
          localStorage.setItem("screenLoaded", true);

          firstMenuRef.click();
          localStorage.setItem("screenLoaded", false);
        }
      }, 300);
    }
  }, [sidebarActive]);
  // const showVideoSlider = () => {
  //   setsidebarActive("tv")
  //   localStorage.setItem(
  //     globals.ACTIVE_COMPONENT,
  //     globals.COMPONENT_NAME.Sidebar
  //   );
  // }

  if (sidebarActive == "tv") {
    return (
      <>
        <PlayerControls


          backtohome={backtohome}

        />

        <ContentCategory
          backtohome={backtohome}
          show={sidebarActive === "tv"}

        />
      </>
    );
  } else if (sidebarActive === "discover") {
    return (
      <DiscoverScreen
        backtohome={backtohome}
        show={sidebarActive === "discover"}

      />
    );
  } else if (sidebarActive === "search") {
    return <PrivacyPage backtohome={backtohome} show={sidebarActive == "search"} />;
  } else if (sidebarActive === "login") {
    return <Login backtohome={backtohome} show={sidebarActive == "login"} />;
  }
}
export default OverScreens;
