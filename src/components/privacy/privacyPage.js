import React, { useEffect } from "react";
import { demotext } from "../../utility/constant";
import VerticalList from "../../helper/VerticalList";
import ControlToggle from "./ControlToggle";
import { globals } from "../../global";

export const scrolling = (key) => {

    const section = document.getElementById("scrollItem");
    if (!section) return "No section found";

    const isAtBottom = section.scrollTop + section.clientHeight >= section.scrollHeight;
    const isAtTop = section.scrollTop === 0;

    if (key === "down") {
        if (!isAtBottom) {
            // Scroll down if there is more content below
            section.scrollBy({ top: 50, behavior: "smooth" });
            return "Scrolling down";
        } else {
            // Return when bottom is reached
            return "Reached bottom";
        }
    } else if (key === "up") {
        if (!isAtTop) {
            // Scroll up if there is more content above
            section.scrollBy({ top: -50, behavior: "smooth" });
            return "Scrolling up";
        } else {
            // Return when top is reached
            return "Reached top";
        }
    }

    return "Invalid direction";
}


function PrivacyPage({ show, backtohome }) {
    const datasection = document.getElementById("datasection");

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                let datasection = document.getElementById("datasection");

                if (datasection) {
                    localStorage.setItem("screenLoaded", true);
                    datasection.click();
                    localStorage.setItem("screenLoaded", false);

                    localStorage.setItem(globals.ACTIVE_COMPONENT, "scroll-data");

                }
            }, 300);
        }
    }, [show, datasection != null]);



    return (
        <div
            className={`mainbox    overflow-y-auto bg-black ${show ? "" : "hidden"}`}
            style={{ position: "absolute", top: "0" }}
        >
            <div className="py-5">
                <div className="tnc-title">
                    <div className="m-auto mt-5 text-center text-white text-[32px]">TERMS & CONDITIONS</div>
                </div>

                {/* <VerticalList> */}
                <ControlToggle onBack={() => backtohome()} type={"data"} >
                    <div className=" text-justify w-[90%] my-5 h-[80vh] 4k:h-[90vh] 720p:h-[70vh] m-auto mt-5 overflow-y-auto scroll-hidden " id="scrollItem"  >

                        {demotext}
                    </div>
                </ControlToggle>

                {/* </VerticalList> */}

                {/* <VerticalList>
                        <ControlToggle type={"button"}  >

                            Accept


                        </ControlToggle>
                        </VerticalList> */}
            </div>
        </div>
    );
}

export default PrivacyPage;
