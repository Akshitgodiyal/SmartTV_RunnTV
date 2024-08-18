import React, { useContext } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import VerticalList from "../../helper/VerticalList";
import DiscoverScreen from "../discoverScreen";
import HorizontalList from "../../helper/HorizontalList";
import WatchHistory from "../historyScreen";
import Login from "../login";

function OverScreens({ setUrl }) {
  const { sidebarActive } = useContext(VideoContext);

  return (
    <>
    { sidebarActive == "user" ? <ContentCategory show={sidebarActive == "user"} setUrl={setUrl} />:sidebarActive == "search"?
      <DiscoverScreen show={sidebarActive == "search"} setUrl={setUrl} />:sidebarActive == "history" ?
      <WatchHistory show={sidebarActive == "history"} setUrl={setUrl} />:sidebarActive == "star"?
      <Login show={sidebarActive == "star"} setUrl={setUrl} /> :null}
    </>
  );
}

export default OverScreens;
