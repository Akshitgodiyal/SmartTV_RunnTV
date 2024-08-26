import React, { useState, useRef, useEffect, useContext } from "react";
import { Focusable, VerticalList } from "../helper/react-navigation";
import { VideoContext } from "../utility/context";
import { globals } from "../global";
import tvImage from "../assets/images/tv.png";
import discoverImage from "../assets/images/discover.png";
import eyeImage from "../assets/images/eye.png";
import searchImage from "../assets/images/search.png";
const ToggleItem = ({
  icon,
  children,
  isFocused,
  onFocus,
  onEnterDown,
  isActiveIndex,
  focusedIndex
}) => {
  const [active, setActive] = useState(0);
  return (
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onEnterDown}
    >
      <div
        className={`item ${active ? "item-focus" : ""} ${
          isActiveIndex ? "active" : ""
        }`}
      >
        {children}
      </div>
    </Focusable>
  );
};

const Sidebar = () => {
  const [focusedIndex, setFocusedIndex] = useState(1);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeItemName, setActiveItemName] = useState("tv");
  const { setsidebarActive } = useContext(VideoContext);
  const [active, setActive] = useState(0);
  const content1 = useRef(null);
  const items = [
    {
      id: "login",
      label: "login",
      icon: "",
    },
    {
      id: "tv",
      label: "Home",
      icon: tvImage,
    },
    {
      id: "discover",
      label: "Discover",
      icon: discoverImage,
    },
    {
      id: "eye",
      label: "Watchlist",
      icon: eyeImage,
    },
    {
      id: "search",
      label: "Search",
      icon: searchImage,
    },
    {
      id: "Exit",
      label: "Exit",
      icon: "",
    },
  ];

  const handleSetActive = (status, index) => {
    setActive(status);
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
    handleSetActive(true, index);
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Sidebar
    );
  };

  const onEnterDown = (index) => {
    setActiveIndex(index);
    setsidebarActive(items[index].id);
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Sidebar
    );
  };

  return (
    <div id="side_bar" className={active ? "focused" : ""}>
      <div ref={content1}>
        <VerticalList
          onFocus={(index) => onFocus(index)}
          onBlur={() => handleSetActive(false)}
          retainLastFocus={true}
          id={globals.COMPONENT_NAME.Sidebar}
        >
          {items.map((icon, index) => (
            <ToggleItem
              key={icon}
              icon={icon}
              isActiveIndex={activeIndex === index}
              onEnterDown={() => onEnterDown(index)}
              focusedIndex={focusedIndex=== index}
            >
              <img
                src={icon.icon}
                alt={icon.id}
                style={{ float: "left" }}
              ></img>
              <div className="itemdiv">{icon.label}</div>
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
