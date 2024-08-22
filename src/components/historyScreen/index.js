import React, { useState } from "react";
import { Focusable, HorizontalList } from "../../helper/react-navigation";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import { IconStarFilled } from "@tabler/icons-react";
 // Import your Focusable component

function WatchHistory({ setUrl, show }) {
  const types = ["Cash", "Credit Card", "Bitcoin"];
  const [active, setActive] = useState(types[0]);

  // Handler for when a tab gains focus
  const handleFocus = (index) => {
    setActive(types[index]);
  };

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
            <div className="flex my-10">
              {types.map((type, index) => (
                <Focusable
                  key={type}
                  onFocus={() => handleFocus(index)}
                  navDefault={index === 0} // Set the first tab as the default focus
                >
                  <button
                    className={`font-semibold text-[32px] py-2 px-8 cursor-pointer transition-opacity ${
                      active === type
                        ? "border-b-2 border-[#D22F26] opacity-100 font-bold text-[white]"
                        : "border-b-2 border-[#9E9C9C] text-[#9E9C9C]"
                    }`}
                  >
                    <div className="flex justify-center gap-2 items-center">
                      <IconStarFilled size={32} /> {type}
                    </div>
                  </button>
                </Focusable>
              ))}
            </div>
          </HorizontalList>

          <div className="h-full flex flex-col justify-center items-center bg-gray-800">
            <p className="mt-4 text-lg text-white">Your payment selection: {active}</p>
            <p className="mt-4 text-lg text-white">Your payment selection: {active}</p>
            <p className="mt-4 text-lg text-white">Your payment selection: {active}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchHistory;
