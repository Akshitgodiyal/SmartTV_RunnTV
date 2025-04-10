import React, { useState, useEffect,useContext } from "react";
import Focusable from "../../helper/Focusable";
import { img_cloudfront1 } from "../../utility/constant";
import { globals } from "../../global.js";
import ApiHelper from "../../helper/ApiHelper.js";
import { VideoContext } from "../../utility/context.js";
import { mapChannelEpg } from "../../helper/mapper/mapChannelEpg.js";
const ToggleItem = (props) => {
  const [active, setActive] = useState(false);
  const {setsidebarActive } = useContext(VideoContext);
  const { setActiveIndex } = useContext(VideoContext);
  const { lists, setLists } = useContext(VideoContext); 
  const assetClick = (id) => {
    localStorage.setItem("LastFocusedItemId", id);
    if(props.type==="Categories"){
      setCategoryResult();
    }else if(props.type==="Genres"){
      setGenreResult();
    }else if(props.type==="Language"){
      setLanguageResult()
    }
 
    //filterCategoryResult

    if (props.onClick) {
      props.onClick(props.assetinfo);
    }
  };

  const onKeyDown = (id) => {
    assetClick(id);

    if (props.onEnter) {
      props.onEnter(); // Call the passed callback function
    }
  };
  const setCategoryResult=()=>{
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
    ApiHelper.get(globals.API_URL.GET_EPG_BY_CATEGORY_ID+props.assetinfo.categoryId, headers)
    .then((result) => { 
      var _category = [props.assetinfo];
      localStorage.setItem("filterCategory", JSON.stringify(_category));
      var _list=mapChannelEpg(result);
      setLists(_list)
      localStorage.setItem("filterCategoryResult", JSON.stringify(_list));
      setActiveIndex(1);
      setsidebarActive("tv");
    })
    .catch((error) => { 
      console.error('API Error:', error);
      
    });
  }
  const setGenreResult=()=>{
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
    ApiHelper.get(globals.API_URL.GET_EPG_BY_GENRE_ID+props.assetinfo.genreId, headers)
    .then((result) => { 
      var _category = [props.assetinfo]; 
      localStorage.setItem("filterCategory", JSON.stringify(_category));
       var _list=mapChannelEpg(result);
      setLists(_list)
      localStorage.setItem("filterCategoryResult", JSON.stringify(_list));
      setActiveIndex(1);
      setsidebarActive("tv");
    })
    .catch((error) => { 
      console.error('API Error:', error);
      
    });
  }
  const setLanguageResult=()=>{
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
    ApiHelper.get(globals.API_URL.GET_EPG_BY_LANGUAGE_ID+props.assetinfo.languageId, headers)
    .then((result) => { 
      var _category = [props.assetinfo];
      localStorage.setItem("filterCategory", JSON.stringify(_category));
      var _list=mapChannelEpg(result);
      setLists(_list)
      localStorage.setItem("filterCategoryResult", JSON.stringify(_list));
      setActiveIndex(1);
      setsidebarActive("tv");
    })
    .catch((error) => { 
      console.error('API Error:', error);
      
    });
  }
  const renderContent = () => {
    switch (props.type) {
      case "slider":
        return (
          <div
            id={props.index === 0 ? "firstSection" : null}
            className={
              "item slider-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
            style={{
              backgroundImage: `url(${
                img_cloudfront1 + props.assetinfo?.images?.tv
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: props.assetinfo.images?.tv ? "#6457578c" : null,
            }}
          >
            <div className="slider-box">
              <div className="slider-title text-white">
                {props.assetinfo?.name}
              </div>
              <div
                className="slider-text"
                style={{
                  lineHeight: "1.5",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  whiteSpace: "normal",
                }}
              >
                {props.assetinfo?.description}
              </div>
            </div>
          </div>
        );
      case "Streaming":
        return (
          <div
            className={
              "item streaming-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
            style={{
              backgroundImage: `url(${
                img_cloudfront1 +
                props.assetinfo?.schedules[0]?.discoverImages?.tv
              })`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: props.assetinfo?.schedules[0]?.discoverImages?.tv
                ? "#6457578c"
                : null,
            }}
          >
            <div className="bg-red-600 text-center streaming-title text-white px-2">
              {props.assetinfo.title}
            </div>
          </div>
        );
      case "Categories":
        return (
          <div
            style={{
              backgroundImage:
                "url(" + img_cloudfront1 + props.assetinfo?.images?.tv + ")",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: props.assetinfo.images.tv ? "#6457578c" : null,
              // marginLeft: "10px",
              // marginRight: "10px",
            }}
            className={
              "item my-3 rounded-md category-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <div className="category-title flex justify-center items-center w-full h-full">
              {props.assetinfo?.name}
            </div>
          </div>
        );
      case "Genres":
        return (
          <div
            style={{
              backgroundImage:
                "url(" + img_cloudfront1 + props.assetinfo?.images.tv + ")",
              backgroundSize: "Cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: props.assetinfo.images?.tv ? "#6457578c" : null,
              //marginLeft: "1px",
              //marginRight: "10px",
            }}
            className={
              "item my-3 rounded-md genre-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <div className="category-title flex items-end w-full h-full">
              <div
                className="px-2 py-1"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(48, 48, 42, 0.62) 9.38%, rgba(144, 144, 144, 0.72) 100%)",
                }}
              >
                {props.assetinfo?.name}
              </div>
            </div>
          </div>
        );
      case "Channels":
        return (
          <div
            className={
              "item my-3 rounded-md channel-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <div className="Channels">
              <div className="channel-image-box flex justify-center bg-black items-center ">
                <img className="bg-white" />
              </div>
              <div className="text-box bg-[#1A1A1A] space-y-1">
                <div className="streaming-text">Streaming Now</div>
                <div className="title">Streaming Now</div>
                <div className="duration">18:00 - 18:30</div>
              </div>
            </div>
          </div>
        );
      case "Language":
        return (
          <div
            style={{
              backgroundImage:
                "url(" +
                img_cloudfront1 +
                props.assetinfo?.posterImagePath.tv +
                ")",
              backgroundSize: "Cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: props.assetinfo.images?.tv ? "#6457578c" : null,
            }}
            className={
              "item my-3 rounded-md language-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <div className="category-title flex justify-start px-3 items-center w-full h-full">
              {props.assetinfo?.name}
            </div>
          </div>
        );
      default:
        return (
          <div
            className={
              "item default-item " +
              (active ? "item-focus " : "") +
              (props.isActiveIndex ? "active" : "")
            }
          >
            <i className={"fa fa-" + props.icon} /> {props.children}
          </div>
        );
    }
  };
  return (
    <Focusable
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onEnterDown={() =>
        onKeyDown(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      }
      onClick={() =>
        assetClick(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      }
      onBack={() => props.onBack()}
    >
      {renderContent()}
    </Focusable>
  );
};

export default ToggleItem;
