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
       ).catch((error) => {
        console.log("Error====:", error);  
      });
    } catch (error) {
      localStorage.setItem("filterCategory", null);
      console.error("Error fetching data:", error);
    } 
  }
  const loadCategoryData = (category, index) => {
    try {
      const headers = {
        PARTNER_CODE: "ALL",
        userid:globals.getUserId(),
      };
      ApiHelper.get(
        globals.API_URL.GET_EPG_BY_FILTER_ID + category?.categoryId,
        headers
      ).then((result) => {
        if (result && result.length > 0) {
          var channelList = mapChannelEpg(result,index);
          localStorage.setItem("filterCategoryResult", JSON.stringify(channelList));
        }else{
          localStorage.setItem("filterCategoryResult", null);
        }
      })
      .catch((error) => {
        console.log("Error====:", error);  
      });
    } catch (error) {
      localStorage.setItem("filterCategoryResult", null);
      console.error("Error fetching data:", error);
    }
    
   
  };
  function fetchAllDiscoverPageData() {
    const headers = {
      "content-type": "application/json",
      "partner_code": "ALL",
     // "user_id": "26-6E-B9-8F-47-8A"
      "user_id":globals.getUserId(),
    };
  
    const apiEndpoints = [
      
      {
        key: "themeList",
        url: "http://13.126.110.199:9002/runtv/v1/theme/getThemeList",
        headers: headers
      },
      {
        key: "streamingNow",
        url: "http://13.126.110.199:9002/runtv/v1/schedule/getEpgByStreamingNow",
        headers: headers
      },
      {
        key: "category",
        url: "http://13.126.110.199:9002/runtv/v1/category/getCategoryList",
        headers: headers
      },
      {
        key: "genreList",
        url: "http://13.126.110.199:9002/runtv/v1/genre/getGenreList",
        headers: headers
      },
      {
        key: "languageList",
        url: "http://13.126.110.199:9002/runtv/v1/language",
        headers: headers
      }
    ];
  
    const apiCalls = apiEndpoints.map(endpoint => 
      ApiHelper.get(endpoint.url, endpoint.headers)
    );
  
    Promise.all(apiCalls)
      .then((results) => {
        results.forEach((result, index) => {
          localStorage.setItem(apiEndpoints[index].key, JSON.stringify(result));
        });
  
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Clear localStorage on error to avoid using partial data
      });
  }
  
  useEffect(() => {

    fetchCategory();
    fetchAllDiscoverPageData();
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
