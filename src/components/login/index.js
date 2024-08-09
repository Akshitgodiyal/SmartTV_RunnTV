import React, { useState } from "react";
import { Focusable, HorizontalList } from "../../helper/react-navigation";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import { IconStarFilled } from "@tabler/icons-react";
 // Import your Focusable component

function Login({ setUrl, show }) {


  // Handler for when a tab gains focus

  return (
    <div
      className={`mainbox overflow-y-auto bg-black ${show ? "" : "hidden"}`}
      style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0" }}
    >
      <div className="flex flex-col h-full">
        <div className="w-full p-4">
          <img className="w-40" src={logo} alt="Logo" />
          <div className="text-white text-lg">Welcome</div>
        </div>

        <div className="flex-grow h-full">
          <HorizontalList retainLastFocus={true}>
       
      <div className="flex bg-gray-800 h-full rounded-lg shadow-lg">
        {/* Left Side: QR Code */}
        <div className="flex flex-col p-6 items-center justify-center h-full w-1/2 border-r border-gray-600">
          <h2 className="text-white text-lg font-bold mb-4">Sign in by Scanning QR Code</h2>
          <div className="bg-white p-4 rounded-md">
            <img src="/path-to-your-qr-code.png" alt="QR Code" className="w-32 h-32" />
          </div>
          <div className="text-white mt-4">
            <p>Step 1</p>
            <p className="text-sm text-gray-400">Open Left Menu In The RunnTV Mobile App</p>
            <p>Step 2</p>
            <p className="text-sm text-gray-400">Click On Activate TV</p>
            <p>Step 3</p>
            <p className="text-sm text-gray-400">Scan the above QR Code to Login and enjoy your Runn TV experience</p>
          </div>
        </div>

        {/* Right Side: Code Input */}
        <div className="flex flex-col items-center justify-center h-full w-1/2">
          <h2 className="text-white text-lg font-bold mb-4">Using Mobile/Web browser</h2>
          <div className="text-white">
            <p>Step 1</p>
            <p className="text-sm text-gray-400">Visit Runn.Tv/Login On Your Web/Mobile Browser</p>
            <p>Step 2</p>
            <p className="text-sm text-gray-400">Authenticate With Your Credentials</p>
            <p>Step 3</p>
            <p className="text-sm text-gray-400">Enter The Below Code To Login</p>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="text-gray-800 bg-white p-4 rounded-lg text-lg font-bold">A</div>
            <div className="text-gray-800 bg-white p-4 rounded-lg text-lg font-bold">2</div>
            <div className="text-gray-800 bg-white p-4 rounded-lg text-lg font-bold">3</div>
            <div className="text-gray-800 bg-white p-4 rounded-lg text-lg font-bold">C</div>
            <div className="text-gray-800 bg-white p-4 rounded-lg text-lg font-bold">5</div>
          </div>
          <div className="text-white mt-4">
            <p>Step 3</p>
            <p className="text-sm text-gray-400">Once The Code Is Entered, This Screen Will Refresh And TV Will Be Ready To Watch</p>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-8">
        <button className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Skip for now</button>
      </div>
  
          </HorizontalList>

         
        </div>
      </div>
    </div>
  );
}

export default Login;
