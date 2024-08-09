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
  if(sidebarActive === "user"){
    return(<ContentCategory show={sidebarActive === "user"} setUrl={setUrl} />) 
  }else if(sidebarActive === "search"){
    return(<DiscoverScreen show={sidebarActive === "search"} setUrl={setUrl} />)
  }
  
}

export default OverScreens;
