import React from "react";
import logo from "../assets/images/logo.aaf739805db645e7a37b.png";
class SplashScreen extends React.Component {
  render() {
    return (
      <div className="splash-screen">
       {/* <div className="animated-circle">
        
        </div>   */}
        <img src={logo} alt="runnTV"></img>
      </div>
    );
  }
} 
export default SplashScreen;
