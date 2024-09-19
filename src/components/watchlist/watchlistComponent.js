import React, { useContext, useEffect, useState } from "react";
import CommonToggle from "../CommonToggle";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";

function Watchlist({ show, backtohome }) {

  const [activeTab, setActiveTab] = useState('Watchlist');


  let datasection = document.getElementById("watchlist");
  useEffect(() => {

    if (show) {

      setTimeout(() => {
        let datasection = document.getElementById("watchlist");

        if (datasection) {
          localStorage.setItem("screenLoaded", true);
          datasection.click();
          localStorage.setItem("screenLoaded", false);
        }
      }, 200);
    }
  }, [show, datasection != null]);

  return (
    <div
      className={
        "mainbox overflow-y-auto bg-black " + (show ? "" : "hidden")
      }

      style={{ position: "absolute", top: "0" }}
    >
      <div className="w-full p-[48px]">
        <img className="w-40" src={logo} alt="Logo" />
        <div className="text-white text-lg">Welcome</div>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'Watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('Watchlist')}
          >
            <span className="tab-icon">📺</span> Watchlist
          </div>
          <div
            className={`tab ${activeTab === 'Favourites' ? 'active' : ''}`}
            onClick={() => setActiveTab('Favourites')}
          >
            <span className="tab-icon">❤️</span> Favourites
          </div>
          <div
            className={`tab ${activeTab === 'Recent' ? 'active' : ''}`}
            onClick={() => setActiveTab('Recent')}
          >
            <span className="tab-icon">🕑</span> Recent
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'Watchlist' && 
          
          <div className="message-box-container">
          <div className="message-box">
            <div className="icon-placeholder">
              <img src="path-to-icon.png" alt="Icon" />
            </div>
            <div className="message-text">
              <h2>Nothing here for now!</h2>
              <p>
                Add any content to watchlist with <span className="highlight-icon">📺</span> icon and watch it later when you want!
              </p>
            </div>
           
          </div>
        </div>
          
          
          
          
          
          
          
          }
          {activeTab === 'Favourites' && <div>Favourites Content</div>}
          {activeTab === 'Recent' && <div>Recent Content</div>}
        </div>
      </div>

















      <CommonToggle className="" onBack={() => backtohome()} parentNav="seekbar" logincomp="watchlist">
        <div className="seek-bar">

        </div>
      </CommonToggle>
    </div>
  );
}

export default Watchlist;
