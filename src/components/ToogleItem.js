import React, { useState } from "react";
import Navigation, { Focusable } from "../helper/react-navigation.js";
import logo from "../assets/images/logo.aaf739805db645e7a37b.png";
import { img_cloudfront, img_cloudfront1 } from "../utility/constant.js";
const ToggleItem = (props) => {
  const [active, setActive] = useState(false);

  const assetClick = () => {
    var cc = localStorage.getItem("activeNav");
    if (cc !== props.parentNav) {
      return;
    }

    if (props.onClick) {
      props.onClick(props.assetinfo);
    }
  };

  const onKeyDown = () => {
    assetClick();
    if (props.onEnter) {
      props.onEnter(); // Call the passed callback function
    }
  };

  const AgeRatingComponent = ({ ageRating }) => (
    <div>{ageRating?.split(/[-\s]/)[0]}</div>
  );
  const TimeComponent = ({ startTime }) => (
    <div>
      {new Date(startTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
  const EndTimeComponent = ({ startTime, durationSeconds }) => (
    <div>
      {new Date(startTime + durationSeconds * 1000).toLocaleTimeString(
        "en-GB",
        { hour: "2-digit", minute: "2-digit" }
      )}
    </div>
  );


  return (
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
    // preventDown={props.preventDown}
    >
      <div
        id={props.isFirstItem ? "defaultFocused" : ""}
        className={`item   h-[116px] ${active ? "item-focus" : ""
          } ${props.isActiveIndex ? "active" : ""}`}
      >
        {props.parentNav === "home-div-nav" ? (
          <div className=" program-list flex justify-between items-center h-full">
            <div className="text-white pl-[14px]  h-full" style={{
              background: `${props.index == 0 && "linear-gradient(86.21deg, #30203E 57.62%, rgba(27, 8, 42, 0) 97.62%)"}`,
            }}>
              <div className="program-name font-medium truncate w-[50%]">
                {props.assetinfo?.programName}
              </div>
              <div className="detail flex  font-medium gap-1">
                <AgeRatingComponent ageRating={props.assetinfo?.ageRating} /> |{" "}
                <TimeComponent startTime={props.assetinfo?.startTime} />-
                <EndTimeComponent
                  startTime={props.assetinfo?.startTime}
                  durationSeconds={props.assetinfo?.durationSeconds}
                />
              </div>
              {props.activeListIndex && (
                <div
                  className=" focus-program font-normal  text-[#C9C9C9] break-words overflow-hidden"
                  style={{
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    whiteSpace: "normal",
                  }}
                >
                  {props.assetinfo?.description
                    ?.split(" ")
                    .slice(0, 35)
                    .join(" ")}
                </div>
              )}
            </div>
            {props.activeListIndex && (
              <div className="program-image flex justify-center mx-1 bg-sky-500 bg-opacity-75  rounded-md">
                <img className="items-center" src={img_cloudfront + props.assetinfo?.infoImages?.tv} alt="Logo" />
              </div>
            )}
          </div>
        ) : (
          <div>
            {props.images ? <img src={active || props.isActiveIndex ? img_cloudfront1 + props.images.enabledIcon.tv : img_cloudfront1 + props.images.disabledIcon.tv} alt={props.children} /> : ""}
            {props.children}
          </div>
        )}
      </div>
    </Focusable>
  );
};

export default ToggleItem;
