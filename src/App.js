import React, { useState, useEffect } from "react"; 
import "./assets/base.js"; 
import SplashScreen from "../src/pages/splashScreen.js";
import Home from "./pages/Home.js";
import './applicationsdk.js';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
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
