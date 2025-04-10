import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import Watchlisttoggle from "./watchlisttoggle";
import {
  HorizontalList,
  VerticalList,
  Grid,
  Focusable,
} from "../../helper/react-navigation";

import { globals } from "../../global.js";
import ApiHelper from "../../helper/ApiHelper.js";

import GridItem from "../../components/watchlist/gridItem.js"
import LoaderScreen from "../../pages/loader.js";
function Watchlist({ show, backtohome }) {
  const [gridActive, setGridActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Watchlist");

  const [channelList, setChannelList] = useState([]);

  const [row, setRow] = useState(1);
  const [columns] = useState(3);
  let datasection = document.getElementById("Watchlist");
  const [showloader, setShowloader] = useState(true);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        let datasection = document.getElementById("Watchlist");

        if (datasection) {
          datasection.click();
          // setActiveTab("Watchlist")
        }
      }, 200);
    }
  }, [show, datasection != null]);

  const setActive = (data) => {
      if(data){
       setActiveTab(data);
      }
  };

  useEffect(() => {
    var _url = globals.API_URL.GET_WATCH_LIST;
    if (activeTab === "Watchlist") {
      _url = globals.API_URL.GET_WATCH_LIST;
      setWatchList(_url);
    } else if (activeTab === "Favourites") {
      _url = globals.API_URL.GET_FAVORITE_LIST;
      setFavoriteList(_url);
    } else if (activeTab === "Recent") {
      _url = globals.API_URL.GET_FAVORITE_LIST;
      setChannelList([]);
    }

   
  }, [activeTab]);


const setWatchList=(_url)=>{
  setShowloader(true);
  ApiHelper.get(_url + globals.getUserId(), null)
  .then((result) => { 
    const data = Array.isArray(result.data) ? result.data : [];
    setRow(Math.ceil(data.length / columns)); 
    setChannelList(data);
    setTimeout(() => {
      setShowloader(false);
    }, 150); // 150ms = 1 second

  })
  .catch((error) => { 
    console.error('API Error:', error);
    setTimeout(() => {
      setShowloader(false);
    }, 150);
  });
}

const setFavoriteList=(_url)=>{
  setShowloader(true);
  ApiHelper.get(_url + globals.getUserId(), null)
  .then((result) => { 
    const data = Array.isArray(result) ? result : [];
    setRow(Math.ceil(data.length / columns)); 
    setChannelList(data);
    setTimeout(() => {
      setShowloader(false);
    }, 150);  
  })
  .catch((error) => { 
    console.error('API Error:', error);
    setTimeout(() => {
      setShowloader(false);
    }, 150);
  });
}
const assetClick = () => { 
  setGridActive(true); 
 // props.onEnter(props?.log);
//   if (props.onClick) {
//     props.onClick(props.assetinfo);
//   }
 };

const onKeyDown = () => {  
  assetClick();
  // if (props.onEnter) {
  //   props.onEnter(); // Call the passed callback function
  //  }
};
const handleFocus = (section) => {
   debugger;
};
  return (
    <div
      className={"mainbox overflow-y-auto bg-black " + (show ? "" : "hidden")}
      style={{ position: "absolute", top: "0" }}
    >
      <div className="w-full p-[2.5%]">
        <img className="logo-size" src={logo} alt="Logo" />
        <div className="text-white text-lg">Welcome</div>
      </div>
      <div className="tabs-container">
        <HorizontalList retainLastFocus>
          <div className="tabs">
            <Watchlisttoggle
              log="Watchlist"
              onBack={() => backtohome()}
              onEnter={setActive}
              logincomp="Watchlist"
            >
              <span className="tab-icon">📺</span> Watchlist
            </Watchlisttoggle>
            <Watchlisttoggle
              onBack={() => backtohome()}
              onEnter={setActive}
              log="Favourites"
            >
              <span className="tab-icon">❤️</span> Favourites
            </Watchlisttoggle>
            <Watchlisttoggle
              log={"Recent"}
              onBack={() => backtohome()}
              onEnter={setActive}
            >
              <span className="tab-icon">🕑</span> Recent
            </Watchlisttoggle>
          </div>
        </HorizontalList>

        <div style={{ position: "absolute", width: "100vw",  left: 0,  top: 0}}>
           <LoaderScreen show={showloader} />
        </div>
        <div style={{ display: showloader ? "none" : "block" }}>
         
        {channelList && channelList.length > 0 ? (
          <Grid
            //onFocus={handleFocus("dfg")}
            retainLastFocus={true}
            columns={columns}
            rows={row}
          >
            {channelList.map((item, i) => (
              <div className={activeTab}>
                <GridItem
                  key={i}
                  assetInfo={item}
                  type={activeTab}
                  // onFocus={() => console.log('focus ' + i)}
                  // onBlur={() => console.log('blur ' + i)} onEnterDown={() => console.log('enter ' + i)}
                />
              </div>
            ))}
          </Grid>
        ) : (
          <div>
            {" "}
            <div className="tab-content">
              <div className="message-box-container">
                <div className="message-box">
                  <div className="icon-placeholder">
                    <img src="path-to-icon.png" alt="Icon" />
                  </div>
                  <div className="message-text">
                    <h2>Nothing here for now!</h2>
                    <p>
                      Add any content to watchlist with{" "}
                      <span className="highlight-icon">📺</span> icon and watch
                      it later when you want!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
         </div>
      </div>
    </div>
  );
}

export default Watchlist;
