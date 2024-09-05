import React, { useContext, useEffect } from "react";
import { Focusable, HorizontalList } from "../../helper/react-navigation";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import scanner from "../../assets/images/scaaner.png";
import { IconStarFilled } from "@tabler/icons-react";
import ControlToggle from "../CommonToggle";
import { globals } from "../../global";
import { VideoContext } from "../../utility/context";


function Login({ show,backtohome }) {
  let datasection = document.getElementById("logincomp");


  useEffect(() => {
    if (show) {
      setTimeout(() => {
        let datasection = document.getElementById("logincomp");

        if (datasection) {
          localStorage.setItem("screenLoaded", true);
          datasection.click();
          localStorage.setItem("screenLoaded", false);
        }
      }, 300);
    }
  }, [show, datasection != null]);
  const { setsidebarActive } = useContext(VideoContext);
  const {activeIndex, setActiveIndex } = useContext(VideoContext);
  const showVideoSlider = () => {
 
    setActiveIndex(1)
    setsidebarActive("tv")
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Sidebar
    );
 
  }
  return (
    <div
      className={`mainbox    overflow-y-auto bg-black ${show ? "" : "hidden"}`}
      style={{ position: "absolute", top: "0" }}
    >
      <div className="container">
        <div className="w-full py-5">
          <img className="logo" src={logo} alt="Logo" />
        </div>

        <div className="flex h-full rounded-lg shadow-lg gap-2">
          <div className="left-section">
            <div className="flex flex-col items-center justify-center">
              <div className="steps">Sign in by Scanning QR Code</div>
              <div className="qr-code">
                <img className="scanner-img" src={scanner} alt="QR Code" />
              </div>
            </div>

            <div className="space-y-8 mt-4">
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 1</div>
                <div className="font-size-24 text-[#FFFFFF]">Open Left Menu In The RunnTV Mobile App</div>
              </div>
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 2</div>
                <div className="font-size-24 text-[#FFFFFF]">Click on Activate TV</div>
              </div>
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 3</div>
                <div className="font-size-24 text-[#FFFFFF]">Scan the above QR Code to Login and enjoy your Runn TV experience</div>
              </div>
            </div>
          </div>

          <div className="divider-container">
            <div className="divider-line"></div>
            <span className="or-text">OR</span>
          </div>

          <div className="right-section">
            <div className="flex flex-col items-center justify-center">
              <div className="text-white steps font-bold mb-4">Using Mobile/Web browser</div>
            </div>
            <div className="text-white space-y-8">
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 1</div>
                <div className="font-size-24 text-[#FFFFFF]">Visit runn.tv/login on your web/Mobile browser</div>
              </div>
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 2</div>
                <div className="font-size-24 text-[#FFFFFF]">Authenticate with your credentials</div>
              </div>
              <div className="text-white">
                <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 3</div>
                <div className="font-size-24 text-[#FFFFFF]">Enter the below code to login</div>
              </div>
            </div>
            <div className="code-input-container">
              <div className="code-box">A</div>
              <div className="code-box">2</div>
              <div className="code-box">3</div>
              <div className="code-box">C</div>
              <div className="code-box">5</div>
            </div>
            <div className="text-white">
              <div className="font-size-24 text-[#FFFFFF] opacity-75">Step 4</div>
              <div className="font-size-24 text-[#FFFFFF]">Once the code is entered, this screen will refresh and TV will be ready to watch</div>
            </div>
          </div>
        </div>

        <div className="skip-button">
          <ControlToggle    
          onBack={() => backtohome()}
         
          
          type={"data"} logincomp="logincomp">
            <div className="skip-text" >Skip for now</div>
          </ControlToggle>
        </div>
      </div>
    </div>
  );
}

export default Login;
