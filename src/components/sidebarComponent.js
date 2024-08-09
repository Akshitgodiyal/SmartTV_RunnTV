import React, { useState, useRef } from "react";
import { Focusable, VerticalList } from "../helper/react-navigation";

const ToggleItem = ({ icon, children, isFocused, onFocus,onEnterDown,isActiveIndex }) => {

  return (
    <Focusable onFocus={onFocus} onEnterDown={onEnterDown}>
      <div className={"item " + (isFocused ? "item-focus" : "")+" " +(isActiveIndex?"active":"")}>
        {children}
      </div>
    </Focusable>
  );
};

const Sidebar = () => {
  const [focusedIndex, setFocusedIndex] = useState(0); // State to track the selected index
  const [activeIndex, setActiveIndex] = useState(0); 
  const content1 = useRef(null);

  const handleSetActive = (status, index) => {
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
    setFocusedIndex(index); // Update the selected index on focus
    handleSetActive(true, index);
    localStorage.setItem("ACTIVE_COMPONENT", "sidebarComponent");
  };

  const onEnterDown = (index) => {
    setActiveIndex(index); 
    localStorage.setItem("ACTIVE_COMPONENT", "sidebarComponent");
  };

  return (
    <div id="sidebar">
      <div id="icons1">
        <div>
          <span className="fa fa-home" />
        </div>
        <div>
          <span className="fa fa-star" />
        </div>
        <div>
          <span className="fa fa-music" />
        </div>
        <div>
          <span className="fa fa-ellipsis-v" />
        </div>
      </div>
      <div id="icons" ref={content1}>
        <VerticalList
          onFocus={(index) => onFocus(index)}
          onBlur={() => handleSetActive(false)}
          retainLastFocus={true}
          id="sidebarComponent" 
        >
          {["user", "search", "home", "star", "music"].map((icon, index) => (
            <ToggleItem
              key={icon}
              icon={icon}
              isFocused={focusedIndex === index}
              isActiveIndex={activeIndex === index} 
              onEnterDown={() => onEnterDown(index)} 
            >
              {`${index + 1}`}
            </ToggleItem>
          ))}
        </VerticalList>
      </div>
    </div>
  );
};

export default Sidebar;