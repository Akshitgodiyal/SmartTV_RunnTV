import React, { useContext, useEffect, useState } from "react";

import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import HorizontalList from "../../helper/HorizontalList";
import Watchlisttoggle from "./watchlisttoggle";

function Watchlist({ show, backtohome }) {
  const [activeTab, setActiveTab] = useState("Watchlist");

  let datasection = document.getElementById("watchlist");
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        let datasection = document.getElementById("watchlist");

        if (datasection) {
       
          datasection.click();
          setActiveTab("Watchlist")
        }
      }, 200);
    }
  }, [show, datasection != null]);

  return (
    <div
      className={"mainbox overflow-y-auto bg-black " + (show ? "" : "hidden")}
      style={{ position: "absolute", top: "0" }}
    >
      <div className="w-full p-[48px]">
        <img className="w-40" src={logo} alt="Logo" />
        <div className="text-white text-lg">Welcome</div>
      </div>
      <div className="tabs-container">
        <HorizontalList>
          <div className="tabs">
            <Watchlisttoggle
             setActiveTab={setActiveTab}
               log="Watchlist"
              onBack={() => backtohome()}
              onEnter={() => setActiveTab("Watchlist")}
              logincomp="watchlist"
            
            >
           
                <span className="tab-icon">📺</span> Watchlist
        
            </Watchlisttoggle>
            <Watchlisttoggle
             setActiveTab={setActiveTab}
              onBack={() => backtohome()}
              onEnter={() => setActiveTab("Favourites")}
             log ="Favourites"
            >
             
                <span className="tab-icon">❤️</span> Favourites
        
            </Watchlisttoggle>
            <Watchlisttoggle
            setActiveTab={setActiveTab}
           log ={"Recent"}
              onBack={() => backtohome()}
              onEnter={() => setActiveTab("Recent")}
            >
           
                <span className="tab-icon">🕑</span> Recent
           
            </Watchlisttoggle>
          </div>
        </HorizontalList>

        <div className="tab-content">
          {activeTab === "Watchlist" && (
            <div className="message-box-container">
              <div className="message-box">
                <div className="icon-placeholder">
                  <img src="path-to-icon.png" alt="Icon" />
                </div>
                <div className="message-text">
                  <h2>Nothing here for now!</h2>
                  <p>
                    Add any content to watchlist with{" "}
                    <span className="highlight-icon">📺</span> icon and watch it
                    later when you want!
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Favourites" && <div>Favourites Content</div>}
          {activeTab === "Recent" && <div>Recent Content</div>}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
