import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Focusable,
  HorizontalList,
  VerticalList,
} from "../helper/react-navigation";
import { data } from "../data.js";
import List from "./listComponent.js";
import { VideoContext } from "../utility/context.js";
import ToggleItem from "./ToogleItem.js";
import logo from "../assets/images/logo.aaf739805db645e7a37b.png";
import upArrow from "../assets/images/upArrow.png";
import { IconStarFilled } from "@tabler/icons-react";
import { globals } from "../global.js";
import ApiHelper from "../helper/ApiHelper.js";
import { mapChannelEpg } from "../helper/mapper/mapChannelEpg.js";
import { mapFilterCategory } from "../helper/mapper/mapFilterCategory.js";

import Player from "../components/Player/Player.js";
import _icon from "../assets/images/Icon.png";
const ContentCategory = ({ show }) => {
  const { isActive } = useContext(VideoContext);
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [opacity, setOpacity] = useState(1);
  const [activeListIndex, setActiveListIndex] = useState(null); // Track active list index
  const content1 = useRef(null);
  const content2 = useRef(null);
  const playerRef = useRef(null);
  const [url, setUrl] = useState("");

  // eslint-disable-next-line
  const [lists, setLists] = useState([]);
  const [homeCategory, setHomeCategory] = useState([]);

  const handleSetActive = (status, index) => {
    setActive(status);

    if (status && content1.current) {
      const items = content1.current.getElementsByClassName("item");
      const container = content1.current;

      if (items[index]) {
        const rect = items[index].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const isAbove = rect.top < containerRect.top;
        const isBelow = rect.bottom > containerRect.bottom;

        if (isAbove || isBelow) {
          let scrollAmount;
          if (index === items.length - 1) {
            // Special handling for the last item
            scrollAmount = rect.bottom - containerRect.bottom;
          } else {
            scrollAmount =
              rect.top -
              containerRect.top -
              containerRect.height / 2 +
              rect.height / 2;
          }
          container.scrollTop += scrollAmount;
        }
      }
    }
  };

  const changeFocusTo = (index) => {
    setActiveListIndex(index);
    setActive(index !== null);

    if (content2.current) {
      const items = content2.current.getElementsByClassName("contentgroup");
      const container = content2.current;

      if (items[index]) {
        const rect = items[index].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const isAbove = rect.top < containerRect.top;
        const isBelow = rect.bottom > containerRect.bottom;

        if (isAbove || isBelow) {
          let scrollAmount;
          const itemHeight = rect.height;
          const containerHeight = containerRect.height;

          if (index === items.length - 1) {
            // Special handling for the last item in content2
            scrollAmount =
              rect.top -
              containerRect.top -
              containerHeight / 2 +
              itemHeight / 2;
          } else if (index == 3) {
            // Special handling for the last 5 items
            scrollAmount =
              rect.top -
              containerRect.top -
              containerHeight / 2 +
              itemHeight / 2;
          } else {
            scrollAmount =
              rect.top -
              containerRect.top -
              containerHeight / 2 +
              itemHeight / 2;
          }
          container.scrollTop += scrollAmount;
        }
      }
    }
  };

  const abc = (av, index) => {
    setUrl(av);
    setActiveIndex(index);
  };

  useEffect(() => {
    setOpacity(isActive ? 1 : 0);
  }, [isActive]);

  const onFocus = (index, component) => {
    handleSetActive(true, index);
    localStorage.setItem(globals.ACTIVE_COMPONENT, component);
  };
  function fetchData() {
    try {
      const headers = { PARTNER_CODE: "ALL" };
      ApiHelper.get(globals.API_URL.GET_CHANNEL_EPG, headers).then((result) => {
        var channelList = mapChannelEpg(result);
        setUrl(channelList[0].playUrl);
        setLists(channelList);
        SetInitialFocus();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //setLoading(false);
    }
  }
  function fetchCategory() {
    try {
      ApiHelper.get(globals.API_URL.GET_HOME_PAGE_CATEGORY, null).then(
        (result) => { 
          var category = mapFilterCategory(result);
          setHomeCategory && setHomeCategory(category);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //setLoading(false);
    }
  }
  function SetInitialFocus() {
    setTimeout(() => {
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
    }, 50);
  }
  useEffect(() => {
    if (show) {
      fetchCategory();
      fetchData();
    }
  }, [show]);

  return (
    <VerticalList retainLastFocus={true}>
      <Player url={url} ref={playerRef} />

      <div
        className={`mainbox  ${show ? "" : "hidden"}`}
        style={{ position: "absolute", top: "0", opacity: opacity }}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="w-100 *:">
            <img className="w-40" src={logo} alt="Logo" />
            <div className="text-white text-lg"> Kid content </div>
          </div>
          <div className="w-full">
            <div className="flex my-5 w-full justtify-center">
              <img className="w-15 m-auto" src={upArrow} alt="Logo" />
            </div>
            <HorizontalList retainLastFocus={true}>
              <div className="category-filter">
                <div
                  id="category-filter-div"
                  className={active ? "focused " : ""}
                >
                  <div id="category-filter" ref={content1}>
                    <VerticalList
                      id={globals.COMPONENT_NAME.Category_Filter}
                      onFocus={(index) =>
                        onFocus(index, globals.COMPONENT_NAME.Category_Filter)
                      }
                      onBlur={(index) => handleSetActive(false, index)}
                      retainLastFocus={true}
                    >
                      {homeCategory.map((category, index) => (
                        <ToggleItem
                          key={category.name} 
                          images={category.images} 
                          isActiveIndex={activeIndex === index}
                          onEnter={() =>
                            abc(
                              "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
                              index
                            )
                          }
                          index={index}
                        >
                          {category.name}
                        </ToggleItem>
                      ))}
                    </VerticalList>
                  </div>
                </div>
              </div>
              <div
                className="filter"
                style={{ width: "84%", float: "left", overflowY: "auto" }}
                ref={content2}
              >
                {lists && lists.length > 0 ? (
                  <VerticalList
                    id={globals.COMPONENT_NAME.Content}
                    retainLastFocus={true}
                    navDefault={show}
                    onFocus={(index) =>
                      onFocus(index, globals.COMPONENT_NAME.Content)
                    }
                    onBlur={(index) => handleSetActive(false, index)}
                  >
                    {lists?.map((list, i) => (
                      <div
                        className={
                          i === activeListIndex ? "active flex" : "flex "
                        }
                        key={i}
                      >
                        <div className="before-box text-white mt-[6px] mr-3 bg-gray-200 w-[130px] h-[78px] text-center -ml-5">
                          {list.title}
                        </div>
                        <List
                          setUrl={setUrl}
                          title={list.title}
                          layout={list.layout}
                          assets={list.schedules}
                          playUrl={list.playUrl}
                          onFocus={() => changeFocusTo(i)}
                          visible={true}
                          isActive={i === activeListIndex}
                          parentNav="home-div-nav"
                          isFirstList={i === 0 ? true : false}
                        />
                      </div>
                    ))}
                  </VerticalList>
                ) : (
                  <div></div>
                )}
              </div>
            </HorizontalList>
          </div>
        </div>
      </div>
    </VerticalList>
  );
};

export default ContentCategory;
