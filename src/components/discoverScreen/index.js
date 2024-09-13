import React, { useState, useRef, useContext, useEffect } from "react";
import {
  HorizontalList,
  VerticalList,
  Grid,
  Focusable,
} from "../../helper/react-navigation";
import { categories } from "../../data.js";
import { VideoContext } from "../../utility/context.js";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import Carousel from "../carousel/index.js";
import ToggleItem from "../carousel/Toggleitem.js";
import { globals } from "../../global.js";
const DiscoverScreen = ({ setUrl, show, backtohome }) => {
  const [activeListIndex, setActiveListIndex] = useState(null);
  const { setSelectedAsset } = useContext(VideoContext);
  const [themes, setThemes] = useState([]);
  const [language, setlanguage] = useState([]);
  const [category, setCategory] = useState([]);
  const [genre, setGenre] = useState([]);
  const [streamingNow, setStreamingNow] = useState([]);

  useEffect(() => {
    if (show) {
      var themeList = localStorage.getItem("themeList")
        ? JSON.parse(localStorage.getItem("themeList"))
        : null;

      var languageList = localStorage.getItem("languageList")
        ? JSON.parse(localStorage.getItem("languageList"))
        : null;

      var category = localStorage.getItem("category")
        ? JSON.parse(localStorage.getItem("category"))
        : null;

      var genreList = localStorage.getItem("genreList")
        ? JSON.parse(localStorage.getItem("genreList"))
        : null;

      var streamingNow = localStorage.getItem("streamingNow")
        ? JSON.parse(localStorage.getItem("streamingNow"))
        : null;

      if (themeList) {
        setThemes(themeList);
      }
      if (languageList) {
        setlanguage(languageList);
      }
      if (category) {
        setCategory(category);
      }
      if (genreList) {
        setGenre(genreList);
      }
      if (streamingNow) {
        setStreamingNow(streamingNow);
      }
    }
  }, [show]);



  const containerRef = useRef(null);

  const sectionRefs = {
    slider: useRef(null),
    streaming: useRef(null),
    categories: useRef(null),
    genres: useRef(null),
    channels: useRef(null),
    language: useRef(null),
  };

  const scrollToSection = (ref, isFirst = false) => {
    if (containerRef.current && ref.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const sectionTop = ref.current.getBoundingClientRect().top;

      if (isFirst) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({
          top: sectionTop - containerTop,
          behavior: "smooth",
        });
      }
    }
  };

  const handleFocus = (section) => {
    setActiveListIndex(section);
    scrollToSection(sectionRefs[section], section === "slider");
    if (section === "slider") {
      localStorage.setItem(globals.ACTIVE_COMPONENT, "discover");
    } else {
      localStorage.setItem(globals.ACTIVE_COMPONENT, "");
    }
  };



  const firstSection = document.getElementById("firstSection");


  useEffect(() => {

    if (show) {

      handleFocus("slider"); // Focus the section and ensure the 

      setTimeout(() => {
        let firstSection = document.getElementById("firstSection");



        if (firstSection) {
          localStorage.setItem("screenLoaded", true);
          firstSection.click();

          localStorage.setItem("screenLoaded", false);
        }
      }, 300);
    }
  }, [show, firstSection != null]);

  const back = () => {

  }

  return (
    <div
      className={
        "mainbox overflow-y-auto bg-black " +
        (show ? "" : "hidden")
      }
      style={{
        position: "absolute",
        top: "0"
      }}

      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        {/* <div
          className="w-100 absolute top-10
         p-4 z-10"
        >
          <img className="w-40" src={logo} alt="Logo" />
          <div className="text-white text-lg"> Welcome </div>
        </div> */}
        <div className="w-full  ">
          <HorizontalList id="discoverelement" retainLastFocus={true}>
            <div style={{ width: "100%", float: "left", overflowY: "auto" }}>
              <VerticalList
                navDefault={show}
                id="dynamic-content"
                retainLastFocus={true}
              >
                <div
                  ref={sectionRefs.slider}
                  id="discover"
                  className=" mb-[50px]"
                  tabIndex={-1} // Make it focusable
                >
                  {/* <div className="text-white text-[32px]">Streaming Now</div> */}
                  <Carousel
                    setUrl={setUrl}
                    backtohome={backtohome}

                    assets={themes}
                    visible={true}
                    parentNav="home-div-nav"
                    type="slider"
                    onFocus={() => handleFocus("slider")}
                  />
                </div>
                <div ref={sectionRefs.streaming} className=" mb-[50px] pl-[24px] 1080p:pl-[24px]">
                  <div className="text-white text-[32px] my-2">Streaming Now</div>
                  <Carousel
                    setUrl={setUrl}
                    backtohome={backtohome}

                    assets={streamingNow}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Streaming"
                    onFocus={() => handleFocus("streaming")}
                  />
                </div>
                <div ref={sectionRefs.categories} className=" mb-[50px] pl-[24px] 1080p:pl-[24px] w-full">
                  <div className="text-white text-[32px]">Categories</div>


                  <Grid
                    retainLastFocus={true}
                    onFocus={() => handleFocus("categories")}
                    columns={7}
                    rows={2}
                  >
                    {category?.map((asset, i) => (
                      <ToggleItem
                        type="Categories"
                        key={i}
                        assetinfo={asset}
                        parentNav={"first-row"}
                        className="bg-blue-900"
                      />
                    ))}
                  </Grid>
                </div>

                <div ref={sectionRefs.genres} className=" mb-[50px] pl-[24px] 1080p:pl-[24px]">
                  <div className="text-white text-[32px]">Genres</div>
                  <Carousel
                    setUrl={setUrl}
                    backtohome={backtohome}

                    assets={genre}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Genres"
                    onFocus={() => handleFocus("genres")}
                  />
                </div>

                {/* <div ref={sectionRefs.channels} className=" mb-[50px] pl-[24px] 1080p:pl-[24px]">
                  <div className="text-white text-[32px]">Channels</div>
                  <Carousel
                      setUrl={setUrl}
  backtohome={backtohome}
                   
                    assets={categories.assets}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Channels"
                    onFocus={() => handleFocus("channels")}
                  />
                </div> */}

                <div ref={sectionRefs.language} className=" mb-[50px] pl-[24px] 1080p:pl-[24px]">
                  <div className="text-white text-[32px] ">Language</div>
                  <Carousel
                    setUrl={setUrl}
                    backtohome={backtohome}

                    assets={language}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Language"
                    onFocus={() => handleFocus("language")}
                  />
                </div>
              </VerticalList>
            </div>
          </HorizontalList>
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
