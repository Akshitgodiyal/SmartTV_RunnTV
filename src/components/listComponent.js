import React, { useRef, useState } from "react";
import { HorizontalList } from "../helper/react-navigation.js";
import ToggleItem from "./ToogleItem";
const List = (props = []) => {
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
            contentRef.current.scrollTo({
              left:
                itemRect.left -
                containerRect.left +
                contentRef.current.scrollLeft,
              behavior: "smooth",
            });
            const lastItem = items[items.length - 1];
            lastItem.style.marginRight = "0";
        
        }
      }
    }

    setLastFocus(index);
  };

  const handleItemClick = (url) => {
    // console.log("ASdasdasdad");

    props.setUrl(url);
  };

  return (
    <div
      className={`contentgroup ${props.layout} ${
        props.visible ? "" : "fading-out"
      } ${props.isActive ? "active-list" : ""}`}
    >
      <div className="content" ref={contentRef}>
        <HorizontalList
          className="hz-list"
          style={{ overflow: "", display: "block" }}
          onFocus={(index) => onFocus(index)}
          onBlur={() => setLastFocus(null)}
          retainLastFocus={true}
         // preventDown={props.preventDown}
          id={"HorizontalList_"+props.id +props.title }
        >
          {props &&
            props.assets &&
            props.assets.map((asset, i) => (
              <ToggleItem
                activeListIndex={props.isActive}
                firstid={props.index == 0}
                index={i}
                onEnter={() => handleItemClick(props.playUrl)}
                key={i}
                assetinfo={asset}
                parentNav={props.parentNav}
                isFirstItem={props.isFirstList && i == 0 ? true : false}
                // preventDown={props.preventDown}
              />
            ))}
        </HorizontalList>
      </div>
    </div>
  );
};

export default List;
