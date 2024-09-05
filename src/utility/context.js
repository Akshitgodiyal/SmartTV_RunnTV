import React, { createContext, useState, useCallback } from "react";

const VideoContext = createContext();

const MyProvider = ({ children }) => {
  const [sidebarActive, setsidebarActive] = useState("tv");
  const [isActive, setIsActive] = useState("tv");
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);

  const handleSetIsActive = useCallback((status) => {
    setIsActive(status);
  }, []);

  return (
    <VideoContext.Provider
      value={{
        sidebarActive,
        setsidebarActive,
        isActive,
        setIsActive: handleSetIsActive,
        setCurrentTime,
        currentTime,
        bufferedEnd, setBufferedEnd,
        activeIndex, setActiveIndex
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, MyProvider };
