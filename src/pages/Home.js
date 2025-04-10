import React, { useRef, useEffect, useState, useContext } from "react";
import Sidebar from "../components/sidebarComponent.js";
import ContentCategory from "../components/categoryComponent.js";
import Navigation, {
  HorizontalList,
  VerticalList,
} from "../helper/react-navigation.js";
import Player from "../components/Player/Player.js";
import OverScreens from "../components/OverScreens/OverScreens.js";
import { mapChannel } from "../helper/mapper/mapChannelEpg.js";
import { VideoContext } from "../utility/context.js";
import { globals } from "../global.js";
import CommonPop from "../components/popups/commonPop.js";

const Home = () => {
  const { setSelectedAsset } = useContext(VideoContext);
  const { sidebarActive, setsidebarActive } = useContext(VideoContext);
  const { setActiveIndex } = useContext(VideoContext);
  const { setIsActive } = useContext(VideoContext);
  const { setFullscreen } = useContext(VideoContext);
  const { showModal, setShowModal } = useContext(VideoContext);
  const { lists, setLists } = useContext(VideoContext);
  const [activePopup, setActivePopup] = useState([]);
  const showVideoSlider = () => {
    if (lists.length != 0) {
      setFullscreen(false);
      setIsActive(false);
      setActiveIndex(1);
      setsidebarActive("playerControl");
      localStorage.setItem(
        globals.ACTIVE_COMPONENT,
        globals.COMPONENT_NAME.Sidebar
      );
    }
  };

  useEffect(() => {
    var getCategoryResult = localStorage.getItem("filterCategoryResult")
      ? JSON.parse(localStorage.getItem("filterCategoryResult"))
      : null;
    if (getCategoryResult) {
      setSelectedAsset(getCategoryResult[0]);
    }
  }, []);

  const activemenuActive = () => {
    setIsActive(true);
    setActiveIndex(1); 
    setsidebarActive("tv");
  };

  const handleExit = (bool) => {
    if (bool) {
      setActivePopup(globals.COMPONENT_NAME.exitpopup);
      setShowModal(true);

      localStorage.setItem(
        globals.ACTIVE_COMPONENT,
        globals.COMPONENT_NAME.exitpopup
      );
    } else {
      setShowModal(false);
    }
  };
  const handleLogout = (bool) => { 
    if (bool) {
      setActivePopup(globals.COMPONENT_NAME.logoutpopup);
      setShowModal(true); 
      localStorage.setItem(
        globals.ACTIVE_COMPONENT,
        globals.COMPONENT_NAME.logoutpopup
      );
    } else {
      setShowModal(false);
    }
  };
const onConfirm=()=>{
  if(activePopup===globals.COMPONENT_NAME.logoutpopup){
   localStorage.setItem("userDetails","");
   activemenuActive();
   setShowModal(false);
  }else if(activePopup===globals.COMPONENT_NAME.exitpopup){

  }
}
  return (
    <Navigation
      showVideoSlider={() => {
        showVideoSlider();
      }}
      activemenuActive={() => {
        activemenuActive();
      }}
      id="home-div-nav"
      active={true}
    >
      <div className="active-component">
        {showModal && (
          <CommonPop
            onCancel={handleExit}
            onConfirm={onConfirm}
            activePopup={activePopup}
          />
        )}

        <HorizontalList>
          <div>
            <Sidebar handleExit={handleExit} handleLogout={handleLogout} />
            <VerticalList retainLastFocus={true}>
              <Player
              // onBufferUpdate={handleBufferUpdate}
              />
              <OverScreens
                backtohome={() => showVideoSlider()}

                // onSeek={handleSeek}
              />
            </VerticalList>
          </div>
        </HorizontalList>
      </div>
    </Navigation>
  );
};

export default Home;
