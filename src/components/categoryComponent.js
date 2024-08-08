import React, { useState, useRef, useContext, useEffect } from "react";
import { Focusable, HorizontalList, VerticalList } from "../helper/react-navigation";
import { data } from "../data.js";
import List from "./listComponent.js";
import { VideoContext } from "../utility/context.js";
import ToggleItem from "./ToogleItem.js";


const ContentCategory = ({setUrl}) => {
  const {isActive } = useContext(VideoContext);
  const [active, setActive] = useState(false);
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

const abc=(av)=>{
  // console.log("clicked",av);
setUrl(av);
}


useEffect(() => {
  setOpacity(isActive  ? 1:0)
}, [isActive]);
// console.log(isActive);


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
                onFocus={(index) => handleSetActive(true, index)}
                onBlur={(index) => handleSetActive(false,index)}
                retainLastFocus={true}
              >
                <ToggleItem  onEnter={() => abc("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")} icon="user">Menu 1</ToggleItem>
                <ToggleItem  onEnter={() => abc("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8")} icon="user">Menu 1</ToggleItem>
                <ToggleItem icon="search">Menu 2</ToggleItem> 
                <ToggleItem icon="home">Menu 3</ToggleItem>
                <ToggleItem icon="star">Menu 4</ToggleItem>
                <ToggleItem icon="music">Menu 5</ToggleItem>
                <ToggleItem icon="user">Menu 1</ToggleItem>
                <ToggleItem icon="search">Menu 2</ToggleItem>
                <ToggleItem icon="home">Menu 3</ToggleItem>
                <ToggleItem icon="star">Menu 4</ToggleItem>
                <ToggleItem icon="music">Menu 5</ToggleItem>
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
            onFocus={(index) => handleSetActive(true, index)}
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
