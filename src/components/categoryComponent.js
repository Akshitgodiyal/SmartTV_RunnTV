import React, { useState, useRef } from "react";
import { Focusable, HorizontalList, VerticalList } from "../helper/react-navigation";
import { data } from "../data.js";
import List from "./listComponent.js";

const ToggleItem = ({ icon, children }) => {
  const [active, setActive] = useState(false);

  return (
    <Focusable onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      <div className={"item " + (active ? "item-focus" : "")}>
        <i className={"fa fa-" + icon} /> {children}
      </div>
    </Focusable>
  );
};

const ContentCategory = () => {
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const content1 = useRef(null);
  const content2 = useRef(null);
  const [lists, setLists] = useState(data);

  const handleSetActive = (status, index) => {
    setActive(status);
    setOpacity(status ? 1 : 0);


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
    console.log("changeFocusTo", index);
    
    setActive(index);
    setOpacity(index !== null ? 1 : 0);

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
                <ToggleItem icon="user">Menu 1</ToggleItem>
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
            onBlur={(index) => handleSetActive(false,index)}
          >
            {lists.map((list, i) => (
              <List
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
