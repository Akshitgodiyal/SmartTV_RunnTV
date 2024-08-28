import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, {
  HorizontalList,
  VerticalList,
} from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";

const Home = () => { 
  const [selectedAsset, setSelectedAsset] = useState("");
  useEffect(() => {
    var getCategoryResult = localStorage.getItem("filterCategoryResult")
      ? JSON.parse(localStorage.getItem("filterCategoryResult"))
      : null;
    if (getCategoryResult) { 
      setSelectedAsset(getCategoryResult[0]);
    }
  }, []);

  return (
    <Navigation id="home-div-nav" active={true}>
      <div className="active-component">
        <HorizontalList>
          <div>
            <Sidebar />
            <VerticalList retainLastFocus={true}>
              <Player selectedAsset={selectedAsset} />
              <OverScreens setSelectedAsset={setSelectedAsset}/>
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
