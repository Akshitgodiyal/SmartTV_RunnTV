import React, { useContext, useRef, useState } from "react";
import { HorizontalList } from "../helper/react-navigation.js";
import ToggleItem from "./ToogleItem";
import { VideoContext } from "../utility/context.js";

const List = (props) => {
  const contentRef = useRef(null);
  const [lastFocus, setLastFocus] = useState(null);

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
        if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
          item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: itemRect.right > containerRect.right ? "end" : "start",
          });
        }
  
        // Vertical scroll
        if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
          item.scrollIntoView({
            behavior: "smooth",
            block: itemRect.bottom > containerRect.bottom ? "end" : "start",
            inline: "nearest",
          });
        }
  
        // Ensure the last element is fully visible
        if (index == items.length - 1) {
  
          setTimeout(() => {
            contentRef.current.scrollTo({
              left: itemRect.left - containerRect.left + contentRef.current.scrollLeft ,
              behavior: "smooth",
            });
            const lastItem = items[items.length - 1];
            lastItem.style.marginRight = '0';
          }, 200); 
        }
      }
    }
  
    setLastFocus(index);
  };
  const { hlsLink, setHlsLink } = useContext(VideoContext);
  const abc=(av)=>{
    // console.log("clicked",av);
    props.setUrl(av);
  }

  return (
    <div
      className={
        "contentgroup " +
        props.layout +
        " " +
        (props.visible ? "" : "fading-out")
      }
    >
      <div
        className="content"
        ref={contentRef}
      >
        <HorizontalList
          className="hz-list"
          style={{ overflow: "", display: "block" }}
          onFocus={(index) => onFocus(index)}
          onBlur={() => setLastFocus(null)}
          retainLastFocus={true}
        >
          {props.assets.map((asset, i) => (
            <ToggleItem
            onEnter={() => abc("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")}
              key={i}
              assetinfo={asset}
              parentNav={props.parentNav}
            />
          ))}
        </HorizontalList>
      </div>
    </div>
  );
};

export default List;
