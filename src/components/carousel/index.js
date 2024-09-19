import React, { useContext,useRef, useState, useEffect, forwardRef } from "react";
import ToggleItem from "./Toggleitem.js";
import HorizontalList from "../../helper/HorizontalList.js";
import { VideoContext } from "../../utility/context.js";
import {  mapChannel } from "../../helper/mapper/mapChannelEpg.js";
const Carousel = forwardRef((props) => {
  const contentRef = useRef(null);
  const [lastFocus, setLastFocus] = useState(null);
  const { setSelectedAsset } = useContext(VideoContext);
  const {  setFullscreen } = useContext(VideoContext);
  const {setsidebarActive } = useContext(VideoContext);
  const onFocus = (index) => {
    if (lastFocus === index) {
      return;
    }

    if (props.onFocus) {
      props.onFocus();
    }

    if (contentRef.current) {
      const items = contentRef.current.getElementsByClassName("item");
      const item = items[index];
      const containerRect = contentRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect) {
        // Horizontal scroll
        if (
          itemRect.left < containerRect.left ||
          itemRect.right > containerRect.right
        ) {
          item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: itemRect.right > containerRect.right ? "end" : "start",
          });
        }

        // Vertical scroll
        if (
          itemRect.top < containerRect.top ||
          itemRect.bottom > containerRect.bottom
        ) {
          item.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: itemRect.bottom > containerRect.bottom ? "end" : "start",
          });
        }

        // Ensure the last element is fully visible
        if (index === items.length - 1) {
          setTimeout(() => {
            contentRef?.current.scrollTo({
              left:
                itemRect?.left -
                containerRect?.left +
                contentRef?.current.scrollLeft,
              behavior: "smooth",
            });
            const lastItem = items[items.length - 1];
            lastItem.style.marginRight = "0";
          }, 200);
        }
      }
    }

    setLastFocus(index);
  };

  const handleItemClick = (asset, type) => {
    if (type  && type.toLowerCase()==="streaming") {
      setSelectedAsset(mapChannel(asset));
      setsidebarActive("playerControl")
   // props.onBack();
    setTimeout(() => {
       setFullscreen(true);
    }, 100);
    }

    //props.setUrl(url);
  };
  return (
    <div
      className={
        "contentgroup " +
        props.layout +
        (props.visible ? "" : " fading-out") +
        (props.isActive ? " active-list" : "")
      }
    >
      <div className="content" ref={contentRef}>
        <HorizontalList
          className="hz-list"
          style={{ overflow: "", display: "block" }}
          onFocus={(index) => onFocus(index)}
          onBlur={() => setLastFocus(null)}
          retainLastFocus={true}
        >
          {props.assets?.map((asset, index) => (
            <ToggleItem
              onEnter={() => handleItemClick(asset, props.type)}
              onBack={() => props.backtohome()}
              key={index}
              index={index}
              assetinfo={asset}
              parentNav={props.parentNav}
              type={props.type}
            />
          ))}
        </HorizontalList>
      </div>
    </div>
  );
});

export default Carousel;
