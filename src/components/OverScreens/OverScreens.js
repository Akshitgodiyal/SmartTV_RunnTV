import React, { useContext, useEffect,useState } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import DiscoverScreen from "../discoverScreen";
import WatchHistory from "../historyScreen";
import Login from "../login";
import PlayerControls from "../Player/PlayerControls";
import PrivacyPage from "../privacy/privacyPage";
import TermsAndCondition from "../privacy/termsAndCondition";
import { globals } from "../../global";
import Watchlist from "../watchlist/watchlistComponent";
function OverScreens({ backtohome }) {
  const { sidebarActive } = useContext(VideoContext);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    if (sidebarActive === "tv") {
      setTimeout(() => {
        // const firstMenuRef = document.getElementById("defaultFocused");

        // if (firstMenuRef) {
        //   localStorage.setItem("screenLoaded", true);

        //   firstMenuRef.click();
        //   localStorage.setItem("screenLoaded", false);
        // }
      }, 300);
    }
    if (!(sidebarActive == "tv")) {
      localStorage.setItem("isplayerShow", false);
    }

  }, [sidebarActive]);

  if (sidebarActive == "playerControl") {
    return <PlayerControls

      show={sidebarActive == "playerControl"}
      backtohome={backtohome}
      lists={lists} setLists={setLists}
    />;
  }

  else if (sidebarActive == "tv") {
    return (
      <>
        <PlayerControls
        
        
          backtohome={backtohome}
          lists={lists} setLists={setLists}
        />

        <ContentCategory
          backtohome={backtohome}
          show={sidebarActive === "tv"}
          lists={lists} setLists={setLists}
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
    // return <PrivacyPage backtohome={backtohome} show={sidebarActive == "search"} />;
  } else if (sidebarActive === "login") {
    return <Login backtohome={backtohome} show={sidebarActive === "login"} />;

  }else if (sidebarActive === "PrivacyPage") {
    return <PrivacyPage backtohome={backtohome} show={sidebarActive === "PrivacyPage"} />;
  }else if (sidebarActive === "TermsAndCondition") {
    return <TermsAndCondition backtohome={backtohome} show={sidebarActive === "TermsAndCondition"} />;
  }
  else if (sidebarActive === "Watchlist") {
    return <Watchlist backtohome={backtohome} show={sidebarActive === "Watchlist"} />;
  }
}
export default OverScreens;
