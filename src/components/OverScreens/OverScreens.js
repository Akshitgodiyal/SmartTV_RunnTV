import React, { useContext } from "react";
import { VideoContext } from "../../utility/context";
import ContentCategory from "../categoryComponent";
import VerticalList from "../../helper/VerticalList";
import DiscoverScreen from "../discoverScreen";
import HorizontalList from "../../helper/HorizontalList";

function OverScreens({ setUrl }) {
  const { sidebarActive } = useContext(VideoContext);
  if (sidebarActive === "tv") {
    return <ContentCategory show={sidebarActive === "tv"} setUrl={setUrl} />;
  } else if (sidebarActive === "discover") {
    return (
      <DiscoverScreen show={sidebarActive === "discover"} setUrl={setUrl} />
    );
  }
}

export default OverScreens;
