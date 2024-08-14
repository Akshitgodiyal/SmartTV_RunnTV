import React, { createContext, useState, useCallback } from 'react';

const VideoContext = createContext();

const MyProvider = ({ children }) => {
  const [sidebarActive, setsidebarActive] = useState("user");
  const [isActive, setIsActive] = useState("user");

  const handleSetIsActive = useCallback((status) => {
    setIsActive(status);

  }, []);

  return (
    <VideoContext.Provider value={{ sidebarActive, setsidebarActive, isActive, setIsActive: handleSetIsActive }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, MyProvider };
