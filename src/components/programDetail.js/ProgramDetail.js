
import React, { useContext, useState, useEffect, useLayoutEffect } from "react";

import discover from "../../assets/images/discover.png";

import ControlToggle from "../Player/ControlToggle";

function ProgramDetail() {


  return (
    <div className="absolute top-0 right-0 text-white m-[100px]">
    <div className="w-[460px] h-[770px]  text-white p-4 rounded-md">
      <div className="flex items-start space-x-2">
        <div className="w-[120px] h-[80px]">
          <img
            src="https://via.placeholder.com/60" // Replace with the actual logo URL
            alt="Channel Logo"
            className=" w-[120px] h-[70px] object-cover "
          />
        </div>

        <div>
          <h1 className="text-[24px] font-normal">ZEE5 TV</h1>
          <p className="text-[20px] text-[#D9D9D9]">Family Entertainment</p>
        </div>
      </div>
      <p className="mt-2 text-[16px] text-[#D9D9D9] ">
        24 hour Hindi General Entertainment Channel that provides complete
        family entertainment.
      </p>
      <div className="flex mt-6 items-start space-x-2">
        <div className="w-[140px] h-[80px]">
          <img
            src="https://via.placeholder.com/60" // Replace with the actual logo URL
            alt="Channel Logo"
            className=" w-[140px] h-[80px] object-cover "
          />
        </div>

        <div className="font-normal">
          <h2 className="text-[24px] font-normal">Kumkum Bhagya</h2>
          <p className="text-[16px] text-[#D9D9D9] font-normal  border-white border  w-[max-content] ">
            Rated U/A - 13+
          </p>
          <p className="text-[16px] text-[#D9D9D9] font-normal">
            Drama • Emotional • Suspense
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[16px] text-[#D9D9D9] font-medium">
          Description
        </p>
        <p className="text-[16px] text-[#D9D9D9] font-normal">
          Sarla Arora, who runs a marriage hall, hopes to see her daughters,
          Pragya and Bulbul, married. The sisters have their own dreams and
          ambitions but it all changes when Purab and Abhi enter their
          lives.
        </p>
      </div>

      <div className="mt-6 ">
  
           <ControlToggle  type={"detaildata"} className="bg-blue-900 " image={discover}>
    
           Add channel to favourite
      </ControlToggle>
           <ControlToggle  type={"detaildata"} className="bg-blue-900 " image={discover}>
    
           Add title to watchlist
      </ControlToggle>
           <ControlToggle  type={"detaildata"} className="bg-blue-900 " image={discover}>
    
           Episodes
      </ControlToggle>
           <ControlToggle  type={"detaildata"} className="bg-blue-900 " image={discover}>
    
           Change the Audio
      </ControlToggle>
           <ControlToggle  type={"detaildata"} className="bg-blue-900 " image={discover}>
    
           Start Over
      </ControlToggle>
     
      </div>
    </div>
  </div>
  )
}

export default ProgramDetail