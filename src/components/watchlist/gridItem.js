import React, { useState } from "react";
import Focusable from "../../helper/Focusable";
import { img_cloudfront1 } from "../../utility/constant";
import Grid from "../../helper/Grid";

const GridItem = (props) => {
  const [active, setActive] = useState(false);
 
  // Handles asset click event
  const assetClick = (id) => {
    localStorage.setItem("LastFocusedItemId", id);
    if (props.onClick) {
      props.onClick(props.assetinfo); // Calls parent-provided click handler
    }
  };

  // Handles key down event (Enter key press)
  const onKeyDown = (id) => {
    assetClick(id); // Triggers asset click on Enter press
    if (props.onEnter) {
      props.onEnter(); // Optional: Calls parent-provided "onEnter" handler
    }
  };
  const onFocus = () => {
    setActive(true);
  };
  return (
    <>
   

    <Focusable
      onFocus={() => onFocus()} // Handles focus state
      onBlur={() => setActive(false)} // Handles blur state
      onEnterDown={() =>
        onKeyDown(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      } // Handle key press (Enter)
      onClick={() =>
        assetClick(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      } // Handle click
      onBack={() => props.onBack()} // Handle back action
    >
      <div className={" item grid-item " + (active ? "item-focus " : "")}>
        {props.type == "Watchlist" ? (
          <div >
            <div className="channel-header">
              <div className="channel-image">
                <img src={
                    props.assetInfo?.channel?.baseSourceLocation +
                    props.assetInfo?.content?.infoImage.tv
                  }
                  alt={props.assetInfo?.channel?.shortName}
                ></img>
              </div>
              <div className="channel-info">
                  <div className="channel-title">{props?.assetInfo?.content?.title || ""}</div>
                  <div className="channel-age-rating">Rated :  {props?.assetInfo?.content?.rating|| "" } </div>
                  <div className="channel-genre">{props?.assetInfo?.content?.genres?.[0]?.name || "" } </div>
              </div>
            </div>
            <div className="channel-detail">
               {props.assetInfo?.content?.shortSynopsis || "" }
            </div>
          </div>

          
        ) : props.type == "Favourites" ? (
          
            <div >
              <div className="channel-header">
                <div className="channel-image">
                  <img src={
                      props.assetInfo?.baseSourceLocation +
                      props.assetInfo?.images?.poster?.tv
                    }
                    alt={props.assetInfo?.shortName}
                  ></img>
                </div>
                <div className="channel-info">
                    <div className="channel-title">{props?.assetInfo?.title || ""}</div>
                    {/* <div className="channel-age-rating">Rated :  {props?.assetInfo?.rating|| "" } </div> */}
                    <div className="channel-genre">{props?.assetInfo?.genres?.[0]?.name || "" } </div>
                </div>
              </div>
              <div className="channel-detail">
                 {props.assetInfo?.description || "" }
              </div>
            </div>
        ) : props.type == "Recent" ? (
          <div className="">
            <div className="channel-header">
              <div className="channel-image">{/* <img alt={props.} */}</div>
              <div className="channel-info"></div>
            </div>
            <div className="channel-detail"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Focusable>
    </>
  );
};

export default GridItem;
