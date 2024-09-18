import React, { useState, useRef, useContext, useEffect } from "react";
import { HorizontalList, VerticalList } from "../helper/react-navigation";
import List from "./listComponent.js";
import { VideoContext } from "../utility/context.js";
import ToggleItem from "./ToogleItem.js";
import logo from "../assets/images/logo.aaf739805db645e7a37b.png";
import upArrow from "../assets/images/upArrow.png";
import { globals } from "../global.js";
import ApiHelper from "../helper/ApiHelper.js";
import {
  mapChannelEpg,
  setChannelIndex,
} from "../helper/mapper/mapChannelEpg.js";
import { mapFilterCategory } from "../helper/mapper/mapFilterCategory.js";
import { img_cloudfront } from "../utility/constant.js";
import LoaderScreen from "../pages/loader.js";
import NoChannel from "./noChannelComponent.js";

const ContentCategory = ({ show, backtohome }) => {
  const { isActive } = useContext(VideoContext);
  const { setSelectedAsset } = useContext(VideoContext);
  const { lists, setLists } = useContext(VideoContext);

  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [opacity, setOpacity] = useState(1);
  const [activeListIndex, setActiveListIndex] = useState(null); // Track active list index
  const content1 = useRef(null);
  const content2 = useRef(null);
  const [rating, setRating] = useState("");
  // eslint-disable-next-line
  const [homeCategory, setHomeCategory] = useState([]);
  const [showloader, setShowloader] = useState(true);
  const [nextCategoryIndex, setNextCategoryIndex] = useState();
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const handleSetActive = (status, index) => {
    setActive(status);

    if (status && content1.current) {
      const items = content1.current.getElementsByClassName("categories-item");
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

  const changeFocusTo = (index, categoryIndex) => {
    setActiveListIndex(index);
    setActive(index !== null);
    if (activeIndex !== categoryIndex) {
      setActiveIndex(categoryIndex);
      handleSetActive(true, categoryIndex);
    }
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

          if (index == items.length - 1) {
            // Special handling for the last item in content2
            scrollAmount =
              rect.top -
              containerRect.top -
              containerHeight / 2 +
              itemHeight / 2;
          } else if (index === 3) {
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
    if (index === lists.length - 2) {
      setNextCategoryIndex(activeIndex + 1);
    }
  };

  const loadCategoryData = (category, index) => {
    setShowloader(true);
    // setSelectedAsset(null);
    setActiveIndex(index);
    // setNextCategoryIndex(index);
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
    ApiHelper.get(globals.API_URL.GET_EPG_BY_FILTER_ID + category.id, headers)
      .then((result) => {
        if (result && result.length > 0) {
          var channelList = mapChannelEpg(result, index);
          localStorage.setItem(
            "filterCategoryResult",
            JSON.stringify(channelList)
          );
          setLists(channelList);
          setSelectedAsset(channelList[0]);
          SetInitialFocus();
        } else {
          localStorage.setItem("filterCategoryResult", null);
          // setSelectedAsset(null);
          setLists([]);
          setShowloader(false);
          //setActiveIndex(index);
        }
      })
      .catch((error) => {
        console.log("Error====:", error);
        setShowloader(false);
      });
  };

  const loadNextCategory = function () {
    if (homeCategory.length > 0) {
      if (nextCategoryIndex < homeCategory.length) {
        var category = homeCategory[nextCategoryIndex];
        setShowloader(true);
        const headers = {
          PARTNER_CODE: "ALL",
          userid: globals.getUserId(),
        };
        ApiHelper.get(
          globals.API_URL.GET_EPG_BY_FILTER_ID + category.id,
          headers
        )
          .then((result) => {
            if (result && result.length > 0) {
              var channelList = mapChannelEpg(result, nextCategoryIndex);
              var _lists = setChannelIndex(lists.concat(channelList));
              setLists(_lists);
              if (result.length < 3) {
                setNextCategoryIndex(nextCategoryIndex + 1);
                setShowloader(false);
              } else {
                setTimeout(() => {
                  setShowloader(false);
                }, 10);
              }
            } else {
              setNextCategoryIndex(nextCategoryIndex + 1);
              setShowloader(false);
            }
          })
          .catch((error) => {
            console.log("Error====:", error);
            setShowloader(false);
          });
      }
    }
  };
  useEffect(() => {
    if (nextCategoryIndex > 0) {
      loadNextCategory();
    }
  }, [nextCategoryIndex]);
  useEffect(() => {
    setOpacity(isActive ? 1 : 0);
  }, [isActive]);

  const onFocus = (index, component) => {
    handleSetActive(true, index);
    localStorage.setItem(globals.ACTIVE_COMPONENT, component);
  };

  const fetchCategory = () => {
    try {
      ApiHelper.get(globals.API_URL.GET_HOME_PAGE_CATEGORY, null)
        .then((result) => {
          var _result = result.filter((cate) => cate.active === true);
          var category = mapFilterCategory(_result);
          setHomeCategory && setHomeCategory(category);
          //====load data from first filter===//
          loadCategoryData(category[0], 0);
        })
        .catch((error) => {
          console.log("Error====:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };
  const SetInitialFocus = () => {
    setTimeout(() => {
      let lastFocused = localStorage.getItem("LastFocusedItemId")
        ? document.getElementById(localStorage.getItem("LastFocusedItemId"))
        : null;
      let firstSectionRef = lastFocused
        ? lastFocused
        : document.getElementById("defaultFocused");
      if (firstSectionRef) {
        localStorage.setItem("screenLoaded", true);
        firstSectionRef.click();
        localStorage.setItem("screenLoaded", false);
        localStorage.setItem(
          globals.ACTIVE_COMPONENT,
          globals.COMPONENT_NAME.Content
        );
        setShowloader(false);
        localStorage.setItem("LastFocusedItemId", null);
      }
    }, 300);
  };
  useEffect(() => {
    if (show) {
      var getCategory = localStorage.getItem("filterCategory")
        ? JSON.parse(localStorage.getItem("filterCategory"))
        : null;
      if (getCategory) {
        var category = mapFilterCategory(getCategory);
        setHomeCategory && setHomeCategory(category);
        var getCategoryResult =
          lists && lists.length > 0
            ? lists
            : localStorage.getItem("filterCategoryResult")
            ? JSON.parse(localStorage.getItem("filterCategoryResult"))
            : null;
        if (getCategoryResult) {
          setActiveIndex(0);
          setNextCategoryIndex(0);
          setLists(getCategoryResult);
          SetInitialFocus();
        } else {
          loadCategoryData(category[0], 0);
        }
      } else {
        fetchCategory();
      }
    }
  }, [show]);

  return (
    <>
      <LoaderScreen show={showloader} />
      <VerticalList id="contantData" retainLastFocus={true}>
        <div
          className={show ? "mainbox bg-[#000000B8]" : "mainbox hidden"}
          style={{
            position: "absolute",
            top: "0",
            opacity: opacity,
            zIndex: opacity === 1 ? 1 : -1,
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className=" mx-[48px] my-[59px]">
              {/* <img className="w-40" src={logo} alt="Logo" />
              <div className="text-white text-lg border-l-4 border-red-500  pl-1">
                <div className="w-[max-content] text-[24px] bg-black bg-opacity-50 px-2 ">
                  Rated {rating}
                </div>
                <div className="px-2 text-[22px]">Kid content</div>
              </div> */}
            </div>
            <div className="w-full">
              <div className="flex my-5 w-full justtify-center">
                {lists && lists.length > 0 ? (
                  <img
                    id="upArrow"
                    className=" w-15 m-auto"
                    src={upArrow}
                    alt="Logo"
                  />
                ) : (
                  <div></div>
                )}
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
                            fistline={index == 0 ? true : false}
                            key={category.name}
                            images={category.images}
                            isActiveIndex={activeIndex === index}
                            onEnter={() => loadCategoryData(category, index)}
                            index={index}
                            onBack={() => backtohome()}
                          >
                            {category.name}
                          </ToggleItem>
                        ))}
                      </VerticalList>
                    </div>
                  </div>
                </div>
                <div className="scroll-hidden programs-list" ref={content2}>
                  {lists && lists.length > 0 ? (
                    <VerticalList
                      id={globals.COMPONENT_NAME.Content}
                      retainLastFocus={true}
                      navDefault={show}
                      onFocus={(index) =>
                        localStorage.setItem(
                          globals.ACTIVE_COMPONENT,
                          globals.COMPONENT_NAME.Content
                        )
                      }
                      // onBlur={(index) => handleSetActive(false, index)}
                    >
                      {lists?.map((list, i) => (
                        <div
                          className={
                            i === activeListIndex
                              ? "active flex rounded-md "
                              : "flex  rounded-md"
                          }
                          key={i}
                        >
                          <div className="before-box   flex justify-between  items-center  mr-3  text-center ">
                            <div className="720p:text-[16px] 1080p:text-[20px] text-white p-1">
                              101
                            </div>
                            <div className="img-box rounded-md flex justify-center items-center bg-black bg-opacity-75">
                              <img
                                className={
                                  "items-center " +
                                  (i === activeListIndex
                                    ? "active-img"
                                    : "deactive-img")
                                }
                                src={img_cloudfront + list?.image?.logo?.tv}
                                alt="Logo"
                              />
                            </div>
                          </div>
                          <div className="filter">
                            <List
                              id={list.id}
                              //setUrl={setUrl}
                              fistline={i == 0 ? true : false}
                              title={list.title}
                              layout={list.layout}
                              assets={list.schedules}
                              playUrl={list.playUrl}
                              channel={list}
                              onFocus={() =>
                                changeFocusTo(i, list.categoryIndex)
                              }
                              visible={true}
                              isActive={i == activeListIndex}
                              parentNav="home-div-nav"
                              isFirstList={i === 0 ? true : false}
                              onBack={() => backtohome()}
                            />
                          </div>
                        </div>
                      ))}
                    </VerticalList>
                  ) : (
                    <div>
                      <NoChannel></NoChannel>
                      {/* <VerticalList id={globals.COMPONENT_NAME.Content}></VerticalList> */}
                    </div>
                  )}
                </div>
              </HorizontalList>
            </div>
          </div>
        </div>
      </VerticalList>
    </>
  );
};

export default ContentCategory;
