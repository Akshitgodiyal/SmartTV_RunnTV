import React, { useState, useRef, useEffect, useContext } from "react";
import { Focusable, VerticalList } from "../helper/react-navigation";
import { VideoContext } from "../utility/context";

const ToggleItem = ({ icon, children, isFocused, onFocus, onEnterDown, isActiveIndex }) => {
  const [active, setActive] = useState(false);
  return (
    <Focusable 
    onFocus={() => setActive(true)}
    onBlur={() => setActive(false)}
    onEnterDown={onEnterDown}
    >
      <div className={`item ${active ? "item-focus" : ""} ${isActiveIndex ? "active" : ""}`}>
        {children}
      </div>
    </Focusable>
  );
};

const Sidebar = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItemName, setActiveItemName] = useState("user");
  const { setsidebarActive } = useContext(VideoContext);
  const content1 = useRef(null);
  const items = ["user", "search", "home", "star", "music"];

  const handleSetActive = (status, index) => {
    setFocusedIndex(status);
    if (status && content1.current) {
      const items = content1.current.getElementsByClassName("item");
      const rect = items[index] && items[index].getBoundingClientRect();
      const isVisible =
        rect &&
        rect.top >= 980 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= 139;
      if (rect && !isVisible) {
        items[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };



  const onFocus = (index) => {
    debugger;
   // setFocusedIndex(index);
    handleSetActive(true, index);   
     localStorage.setItem("ACTIVE_COMPONENT", "sidebarComponent");
  };

  const onEnterDown = (index) => {
    setActiveIndex(index);
    setsidebarActive(items[index])

    localStorage.setItem("ACTIVE_COMPONENT", "sidebarComponent");
  };

  return (
    <div id="sidebar">
      
      <div id="icons" ref={content1}>
        <VerticalList
          onFocus={(index) => onFocus(index)}
          onBlur={() => handleSetActive(false)}
          retainLastFocus={true}
          id="sidebarComponent"
        >
          {items.map((icon, index) => (
            <ToggleItem
              key={icon}
              icon={icon}
             // isFocused={focusedIndex === index}
              isActiveIndex={activeIndex === index}
              onEnterDown={() => onEnterDown(index)}
            >
              {`${index + 1}`}
            </ToggleItem>
          ))}
        </VerticalList>
      </div>
      <div id="active-item-name">
        <p>Active Item: {activeItemName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
