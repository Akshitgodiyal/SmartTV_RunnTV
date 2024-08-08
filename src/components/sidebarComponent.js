import React, { useState, useRef } from "react";
import { Focusable, VerticalList } from "../helper/react-navigation";

const ToggleItem = ({ icon, children }) => {
  const [active, setActive] = useState(false);

  return (
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className={"item " + (active ? "item-focus" : "")}>
        <i className={"fa fa-" + icon} /> {children}
      </div>
    </Focusable>
  );
};

const Sidebar = () => {
  const [active, setActive] = useState(false);
  const content1 = useRef(null);

  const handleSetActive = (status, index) => {
    setActive(status);
    if (status && content1.current) {
      const items = content1.current.getElementsByClassName("item");
      const rect = items[index] && items[index].getBoundingClientRect();
      const isVisible =
        rect &&
        rect.top >= 980 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= 139;
      if (rect && !isVisible) {
        items[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };
  const onFocus = (index) => {
    handleSetActive(true, index);
    localStorage.setItem("ACTIVE_COMPONENT","sidebarComponent");
  };
  return (
    <div id="sidebar" className={active ? "focused" : ""}>
      <div id="icons">
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
      <div id="menu" ref={content1}>
        <VerticalList
          onFocus={(index) => onFocus(index)}
          onBlur={() => handleSetActive(false)}
          retainLastFocus={true}
          id="sidebarComponent"
        >
          <ToggleItem icon="user">Menu 1</ToggleItem>
          <ToggleItem icon="search">Menu 2</ToggleItem>
          <ToggleItem icon="home">Menu 3</ToggleItem>
          <ToggleItem icon="star">Menu 4</ToggleItem>
          <ToggleItem icon="music">Menu 5</ToggleItem> 
        </VerticalList>
      </div>
    </div>
  );
};

export default Sidebar;