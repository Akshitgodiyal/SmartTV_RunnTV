import React, { useState, useRef, useContext, useEffect } from "react";
import { Focusable, HorizontalList, VerticalList } from "../helper/react-navigation";
import { data } from "../data.js";
import List from "./listComponent.js";
import { VideoContext } from "../utility/context.js";
import ToggleItem from "./ToogleItem.js";
import logo from "../assets/images/logo.aaf739805db645e7a37b.png";

const ContentCategory = ({ setUrl }) => {
  const { isActive } = useContext(VideoContext);
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [activeListIndex, setActiveListIndex] = useState(null); // Track active list index
  const content1 = useRef(null);
  const content2 = useRef(null);
  // eslint-disable-next-line
  const [lists, setLists] = useState(data);

  const handleSetActive = (status, index) => {
    setActive(status);

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
    setActiveListIndex(index); // Set the active list index
    setActive(index !== null);

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

  const abc = (av) => {
    setUrl(av);
  };

  useEffect(() => {
    setOpacity(isActive ? 1 : 0);
  }, [isActive]);

  const onFocus = (index, component) => {
    handleSetActive(true, index);
    localStorage.setItem("ACTIVE_COMPONENT", component);
  };

  return (
    <div
      className="mainbox bg-black bg-opacity-75"
      style={{ position: "absolute", top: "0", opacity: opacity }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="w-100 *:">
          <img className="w-40" src={logo} alt="Logo" />
          <div className="text-white text-lg"> Kid content </div>
        </div>
        <div className="">
          <HorizontalList retainLastFocus={true}>
            <div style={{ width: "20%", float: "left" }}>
              <div id="category-filter-div" className={active ? "focused" : ""}>
                <div id="category-filter" ref={content1}>
                  <VerticalList
                    id="filterComponent"
                    onFocus={(index) => onFocus(index, "filterComponent")}
                    onBlur={(index) => handleSetActive(false, index)}
                    retainLastFocus={true}
                  >
                    <ToggleItem onClick={() => abc("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")} onEnter={() => abc("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")} icon="user">Menu 1</ToggleItem>
                    <ToggleItem onEnter={() => abc("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8")} icon="user">Menu 1</ToggleItem>
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
              style={{ width: "80%", float: "left", overflowY: "auto" }}
              ref={content2}
            >
              <VerticalList
                id="content"
                retainLastFocus={true}
                navDefault
                onFocus={(index) => onFocus(index, "content")}
                onBlur={(index) => handleSetActive(false, index)}
              >
                {lists.map((list, i) => (
                  <div className={i === activeListIndex ?  "active flex": "flex "} key={i}>
                    <div className="before-box text-white mt-[2px] mr-3 bg-gray-200 w-[130px] h-[78px] text-center -ml-5">hello</div>
                    <List
                      setUrl={setUrl}
                      title={list.title}
                      layout={list.layout}
                      assets={list.assets}
                      onFocus={() => changeFocusTo(i)}
                      visible={true}
                      isActive={i === activeListIndex} 
                      parentNav="home-div-nav"
                    />
                  </div>
                ))}
              </VerticalList>
            </div>
          </HorizontalList>
        </div>
      </div>
    </div>
  );
};

export default ContentCategory;
