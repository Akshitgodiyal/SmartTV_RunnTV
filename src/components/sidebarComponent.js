import React, { useState, useRef, useEffect, useContext } from "react";
import { Focusable, VerticalList } from "../helper/react-navigation";
import { VideoContext } from "../utility/context";
import { globals } from "../global";

import loginImageOutlined from "../assets/images/Sign_In_Enabled.svg";
import loginImage from "../assets/images/Sign_In_Enabled.svg";

import tvImage from "../assets/images/tv.png";
import discoverImage from "../assets/images/discover.png";
import eyeImage from "../assets/images/eye.png";
import searchImage from "../assets/images/search.png";

import P_P_Enabled from "../assets/images/P_P_Enabled.svg";
import T_C_Enabled from "../assets/images/T_C_Enabled.svg";
import Kids_safe_Enabled from "../assets/images/Kids_safe_Enabled.svg";

import exitImage from "../assets/images/Exit.png";


const ToggleItem = ({
  icon,
  children,
  isFocused,
  onFocus,
  onEnterDown,
  isActiveIndex,
  focusedIndex,
}) => {
  const [active, setActive] = useState(0);

  return (
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={onEnterDown}
      
    >
      <div 
className={
  "item " +
  (active ? "item-focus " : "") +
  (isActiveIndex ? "active" : "")
}

      >
        {children}
      </div>
    </Focusable>
  );
};

const Sidebar = (props) => {

  const { sidebarActive, setsidebarActive } = useContext(VideoContext);
  const { isActive, setIsActive } = useContext(VideoContext);
  const { activeIndex, setActiveIndex } = useContext(VideoContext);
  const [active, setActive] = useState(0);
  const content1 = useRef(null);
  const items = [
    {
      id: "login",
      label: "Login",
      icon: loginImageOutlined,
      icon_Outlined:loginImage
    },
    {
      id: "tv",
      label: "Home",
      icon: tvImage,
      icon_Outlined:tvImage
    },
    {
      id: "discover",
      label: "Discover",
      icon: discoverImage,
      icon_Outlined:discoverImage
    },
    {
      id: "Watchlist",
      label: "Watchlist",
      icon: eyeImage,
      icon_Outlined:eyeImage
    },
    // {
    //   id: "search",
    //   label: "Search",
    //   icon: searchImage,
    //   icon_Outlined:searchImage
    // },
     {
      id: "PrivacyPage",
      label: "Privacy Policy",
      icon: P_P_Enabled,
      icon_Outlined:searchImage
    },
    {
      id: "TermsAndCondition",
      label: "Terms And Condition",
      icon: T_C_Enabled,
      icon_Outlined:searchImage
    },
    {
      id: "KidsSafe",
      label: "Kid's Safe",
      icon: Kids_safe_Enabled,
      icon_Outlined:searchImage
    },
    {
      id: "Exit",
      label: "Exit",
      icon: exitImage,
      icon_Outlined:exitImage
    },
  ];

  const handleSetActive = (status, index) => {
    setActive(status);
    // setFocusedIndex(status);
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
    
   

  
    localStorage.setItem(
      globals.ACTIVE_COMPONENT,
      globals.COMPONENT_NAME.Sidebar
    );
    if(items[index].id=="Exit"){
    
    props.handleExit(true);
  }else{
    setActiveIndex(index);
    setsidebarActive(items[index].id);
  }
  };

  return (
    <div
      id="side_bar"
      className={active ? "focused" : ""}
      style={{
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 2 : -1,
      }}
    >
     
      <div ref={content1}>
        <VerticalList
          onFocus={(index) => onFocus(index)}
          onBlur={() => handleSetActive(false)}
          retainLastFocus={true}
          id={globals.COMPONENT_NAME.Sidebar}
        >
          {items.map((icon, index) => (
            <ToggleItem
              key={icon.id}
              icon={icon}
              isActiveIndex={activeIndex === index}
              onEnterDown={() => onEnterDown(index)}
              focusedIndex={activeIndex === index}
            >
              <img
                src={icon.icon}
                alt={icon.id}
                style={{ float: "left" }}
                className="svg-image"
              ></img>
              <div className="itemdiv">{icon.label}</div>
            </ToggleItem>
          ))}
        </VerticalList>
      </div>
      {/* <div id="active-item-name">
        <p>Active Item: {activeItemName}</p>
      </div> */}
    </div>
  );
};

export default Sidebar;
