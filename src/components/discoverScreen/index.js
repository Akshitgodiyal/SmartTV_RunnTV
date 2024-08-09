import React, { useState, useRef, useContext, useEffect } from "react";
import { HorizontalList, VerticalList } from "../../helper/react-navigation";
import { categories } from "../../data.js";
import { VideoContext } from "../../utility/context.js";
import logo from "../../assets/images/logo.aaf739805db645e7a37b.png";
import Carousel from "../carousel/index.js";
import ToggleItem from "../carousel/Toggleitem.js";
const DiscoverScreen = ({ setUrl, show ,forceFocus}) => {
  const [activeListIndex, setActiveListIndex] = useState(null);

  const containerRef = useRef(null);
  const firstSectionRef = useRef(null); // Ref for the first section
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
      localStorage.setItem("ACTIVE_COMPONENT", "discover");
    } else {
      localStorage.setItem("ACTIVE_COMPONENT", "");
    }
  };

  useEffect(() => {
    if (show) {
      handleFocus("streaming"); // Focus the section and ensure the Carousel is 
      // properly focused
setTimeout(() => {
  if(firstSectionRef){
    localStorage.setItem("screenLoaded",true);
    firstSectionRef.click();
    localStorage.setItem("screenLoaded",false);
  }
}, 200);

  
    }
  }, [show,firstSectionRef]);

 

  return (
    <div
      className={`mainbox overflow-y-auto bg-black ${show ? "" : "hidden"}`}
      style={{ position: "absolute", top: "0" }}
      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        <div
          className="w-100 absolute top-10
         p-4 z-10"
        >
          <img className="w-40" src={logo} alt="Logo" />
          <div className="text-white text-lg"> Welcome </div>
        </div>
        <div className="w-full">
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
                  className="mb-[50px]"
                  tabIndex={-1} // Make it focusable
                >
                  {/* <div className="text-white text-[32px]">Streaming Now</div> */}
                  <Carousel
                  forceFocus={forceFocus}
                  id={firstSectionRef}
                    setUrl={setUrl}
                    title={categories.title}
                    layout={categories.layout}
                    assets={categories.assets}
                    visible={true}
                    parentNav="home-div-nav"
                    type="slider"
                    onFocus={() => handleFocus("slider")}
                  />
                </div>
                <div  ref={sectionRefs.streaming} className="mb-[50px]">
                  <div className="text-white text-[32px]">Streaming Now</div>
                  <Carousel
                    setUrl={setUrl}
                    title={categories.title}
                    layout={categories.layout}
                    assets={categories.assets}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Streaming"
                    onFocus={() => handleFocus("streaming")}
                  />
                </div>
                <div ref={sectionRefs.categories} className="mb-[50px] w-full">
                  <div className="text-white text-[32px]">Categories</div>
                  <VerticalList
                    retainLastFocus={true}
                    onFocus={() => handleFocus("categories")}
                  >
                    <HorizontalList>
                      {categories.assets.slice(0, 7).map((asset, i) => (
                        <ToggleItem
                          type="Categories"
                          key={i}
                          assetinfo={asset}
                          parentNav={"first-row"}
                          className="bg-blue-900"
                        />
                      ))}
                    </HorizontalList>
                    <HorizontalList>
                      {categories.assets.slice(7).map((asset, i) => (
                        <ToggleItem
                          type="Categories"
                          key={i}
                          assetinfo={asset}
                          parentNav={"second-row"}
                          className="bg-blue-900"
                        />
                      ))}
                    </HorizontalList>
                  </VerticalList>
                </div>

                <div ref={sectionRefs.genres} className="mb-[50px]">
                  <div className="text-white text-[32px]">Genres</div>
                  <Carousel
                    setUrl={setUrl}
                    title={categories.title}
                    layout={categories.layout}
                    assets={categories.assets}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Genres"
                    onFocus={() => handleFocus("genres")}
                  />
                </div>

                <div ref={sectionRefs.channels} className="mb-[50px]">
                  <div className="text-white text-[32px]">Channels</div>
                  <Carousel
                    setUrl={setUrl}
                    title={categories.title}
                    layout={categories.layout}
                    assets={categories.assets}
                    visible={true}
                    parentNav="home-div-nav"
                    type="Channels"
                    onFocus={() => handleFocus("channels")}
                  />
                </div>

                <div ref={sectionRefs.language} className="mb-[50px]">
                  <div className="text-white text-[32px]">Language</div>
                  <Carousel
                    setUrl={setUrl}
                    title={categories.title}
                    layout={categories.layout}
                    assets={categories.assets}
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
