import React, { useContext } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import VerticalList from "../../helper/VerticalList";
import DiscoverScreen from "../discoverScreen";
import HorizontalList from "../../helper/HorizontalList";

function OverScreens({ setUrl }) {
  const { sidebarActive } = useContext(VideoContext);

  return (
    <>
      <ContentCategory show={sidebarActive == "user"} setUrl={setUrl} />

      <DiscoverScreen show={sidebarActive == "search"} setUrl={setUrl} />
    </>
  );
}

export default OverScreens;
