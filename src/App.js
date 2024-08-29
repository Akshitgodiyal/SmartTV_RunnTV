import React, { useState, useEffect } from "react";
import "./assets/base.js";
import SplashScreen from "../src/pages/splashScreen.js";
import Home from "./pages/Home.js";
import "./applicationsdk.js";
import { globals } from "./global.js";
import ApiHelper from "./helper/ApiHelper.js";
import { mapChannelEpg } from "./helper/mapper/mapChannelEpg.js";
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  function fetchCategory() {
    try {
      ApiHelper.get(globals.API_URL.GET_HOME_PAGE_CATEGORY, null).then(
        (result) => { 
          localStorage.setItem("filterCategory", JSON.stringify(result));
          loadCategoryData(result[0],0)
        }
      );
    } catch (error) {
      localStorage.setItem("filterCategory", null);
      console.error("Error fetching data:", error);
    } 
  }
  const loadCategoryData = (category, index) => {
    try {
      const headers = {
        PARTNER_CODE: "ALL",
        userid: "814b3509-2309-4e7c-b903-dc09389f7fbd",
      };
      ApiHelper.get(
        globals.API_URL.GET_EPG_BY_FILTER_ID + category.categoryId,
        headers
      ).then((result) => {
        if (result && result.length > 0) {
          var channelList = mapChannelEpg(result);
          localStorage.setItem("filterCategoryResult", JSON.stringify(channelList));
        }else{
          localStorage.setItem("filterCategoryResult", null);
        }
      })
      
    } catch (error) {
      localStorage.setItem("filterCategoryResult", null);
      console.error("Error fetching data:", error);
    }
    
   
  };

  useEffect(() => {
    fetchCategory();
    const splashTimeout = setTimeout(() => {
      setShowSplash(false); // Hide the splash screen after 1 second
    }, 1000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  // Render the splash screen if showSplash is true
  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <>
      <Home />
    </>
  );
};
export default App;
