import React, { useState, useRef, useContext, useEffect } from "react";
import { Focusable, HorizontalList, VerticalList } from "../helper/react-navigation";
import { data } from "../data.js";
import List from "./listComponent.js";
import { VideoContext } from "../utility/context.js";
import ToggleItem from "./ToogleItem.js";


const ContentCategory = ({setUrl}) => {
  const {isActive } = useContext(VideoContext);
  const [active, setActive] = useState(false); 
  const [activeIndex, setActiveIndex] = useState(0); 
  const [opacity, setOpacity] = useState(1);
  const content1 = useRef(null);
  const content2 = useRef(null);
  // eslint-disable-next-line
  const [lists, setLists] = useState(data);
  const { hlsLink, setHlsLink } = useContext(VideoContext);
 
  const handleSetActive = (status, index) => {
    setActive(status);
    // setOpacity(status ? 1 : 0);
  


    if (status && content1.current) {
      const items = content1.current.getElementsByClassName("item");
      const rect = items[index] && items[index].getBoundingClientRect();
      const containerRect = content1.current.getBoundingClientRect();

      if (rect) {
        if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
          items[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
  };

  const changeFocusTo = (index) => {
   
   
    setActive(index);
    // setOpacity(index !== null ? 1 : 0);

    if (content2.current) {
      const items = content2.current.getElementsByClassName("contentgroup");
      const rect = items[index] && items[index].getBoundingClientRect();
      const containerRect = content2.current.getBoundingClientRect();

      if (rect) {
        if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
          items[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
  };

const abc=(av,index)=>{
  // console.log("clicked",av);
   setUrl(av);
   setActiveIndex(index);
}


useEffect(() => {
  setOpacity(isActive  ? 1:0)
}, [isActive]);
// console.log(isActive);
const onFocus = (index,component) => {
  handleSetActive(true, index);
  localStorage.setItem("ACTIVE_COMPONENT",component);
};

  return (
    <div
      className="mainbox bg-black bg-opacity-75"
      style={{ position: "absolute", top: "50%", opacity: opacity }}
    >
      <HorizontalList retainLastFocus={true}>
        <div style={{ width: "20%", float: "left" }}>
          <div id="category-filter-div" className={active ? "focused" : ""}>
            <div id="category-filter" ref={content1}>
              <VerticalList
               id="filterComponent"
               onFocus={(index) => onFocus( index,"filterComponent")}
                onBlur={(index) => handleSetActive(false,index)}
                retainLastFocus={true}
              >

              {["Menu 2", "Menu 2", "Menu 2", "Menu 2", "Menu 2","Menu 2", "Menu 2", "Menu 2", "Menu 2", "Menu 2"].map((icon, index) => (
                          <ToggleItem
                            key={icon}
                            icon={icon}
                            // isFocused={focusedIndex === index}
                            isActiveIndex={activeIndex === index} 
                            onEnter={() => abc("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",index)}
                          >
                            {index}
                          </ToggleItem>
                        ))}

                 
              </VerticalList>
            </div>
          </div>
        </div>
        <div
          className="filter"
          style={{ width: "75%", float: "left", overflowY: "auto" }}
          ref={content2}
        >
          <VerticalList
            id="content"
            retainLastFocus={true}
            navDefault
            onFocus={(index) => onFocus( index,"content")}
            onBlur={(index) => handleSetActive(false,index)}
           
          >
            {lists.map((list, i) => (
              <List
              setUrl={setUrl}
                key={i}
                title={list.title}
                layout={list.layout}
                assets={list.assets}
                onFocus={() => changeFocusTo(i)}
                visible={true}
                parentNav="home-div-nav"
              />
            ))}
          </VerticalList>
        </div>
      </HorizontalList>
    </div>
  );
};

export default ContentCategory;
