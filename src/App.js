import React, { useState, useEffect } from "react";
import Sidebar from "../src/components/sidebarComponent.js";
import "./assets/base.js";
import SplashScreen from "../src/pages/splashScreen.js";
import ContentCategory from "../src/components/categoryComponent.js";
import Navigation, { HorizontalList } from "./helper/react-navigation.js";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      //  console.log(context);
      setShowSplash(false); // Hide the splash screen after 1 second
    }, 1000);

    // Uncomment to add more lists after 2 seconds
    // const listTimeout = setTimeout(() => {
    //   setLists((prevLists) => prevLists.concat(data_1));
    // }, 2000);

    return () => {
      clearTimeout(splashTimeout);
      // clearTimeout(listTimeout);
    };
  });

  // Render the splash screen if showSplash is true
  if (showSplash) {
    return <SplashScreen />;
  }

  localStorage.setItem("activeNav", "home-div-nav");

  return (
    <>
      <Navigation id="home-div-nav" active={true}>
        <div className="active-component">
          <HorizontalList>
            <div>
              <Sidebar />

              <div
                className="mainbox"
                style={{ position: "absolute", top: "50%" }}
              >
                <HorizontalList retainLastFocus={true}>
                  <div>
                    <ContentCategory navDefault />
                  </div>
                </HorizontalList>
              </div>
            </div>
          </HorizontalList>
        </div>
      </Navigation>

      <div id="main-div"></div>
      <div id="playerDiv"></div>
    </>
  );
};

export default App;
