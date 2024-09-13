import React, { useContext, useRef, useState } from "react";
import { HorizontalList } from "../helper/react-navigation.js";
import ToggleItem from "./ToogleItem";
import { VideoContext } from "../utility/context.js";
import { globals } from "../global.js";
const List = (props) => {
  const contentRef3 = useRef(null);
  const [lastFocus, setLastFocus] = useState(null);
  const { setSelectedAsset } = useContext(VideoContext);
  const onFocus = (index) => {
    if (lastFocus === index) {
      return;
    }

    if (props.onFocus) {
      props.onFocus();
    }

    if (contentRef3.current) {
      const items = contentRef3.current.getElementsByClassName("program-item");
      const item = items[index];
      const containerRect = contentRef3.current.getBoundingClientRect();
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
          contentRef3.current.scrollTo({
            left:
              itemRect.left -
              containerRect.left +
              contentRef3.current.scrollLeft,
            behavior: "smooth",
          });
          const lastItem = items[items.length - 1];
          lastItem.style.marginRight = "0";
        }
      }
    }

    setLastFocus(index);
  };
  const { fullscreen, setFullscreen } = useContext(VideoContext);
  const { isActive, setIsActive } = useContext(VideoContext);
  const handlefullscreen = () => {
    if (fullscreen == false) {
      setFullscreen(true);
    } else {
      setFullscreen(false);

      setIsActive(true);
      let firstSectionRef = document.getElementById("defaultFocused");
      if (firstSectionRef) {
        localStorage.setItem("screenLoaded", true);
        firstSectionRef.click();
        localStorage.setItem("screenLoaded", false);
        localStorage.setItem(
          globals.ACTIVE_COMPONENT,
          globals.COMPONENT_NAME.Content
        );
      }
    }
  };
  const handleItemClick = (url) => {
    setSelectedAsset(url);
    props.onBack();
    setTimeout(() => {
      handlefullscreen();
    }, 100);
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
      <div className="content" ref={contentRef3}>
        <HorizontalList
          className="hz-list"
          style={{ overflow: "", display: "block" }}
          onFocus={(index) => onFocus(index)}
          onBlur={() => setLastFocus(null)}
          retainLastFocus={true}
          // preventDown={props.preventDown}
          id={"HorizontalList_" + props.id + props.title}
        >
          {props &&
            props.assets &&
            props.assets.map((asset, i) => (
              <ToggleItem
              fistline={props.fistline}
              onBack={()=>props.onBack()}
                activeListIndex={props.isActive}
                firstid={props.index == 0}
                index={i}
                onEnter={() => handleItemClick(props.channel)}
                key={i}
                assetinfo={asset}
                parentNav={props.parentNav}
                isFirstItem={props.isFirstList && i == 0 ? true : false}
                //preventDown={props.preventDown}
                setRating={props.setRating}
              />
            ))}
        </HorizontalList>
      </div>
    </div>
  );
};

export default List;
