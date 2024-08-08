import React, { createContext, useState, useCallback } from 'react';

const VideoContext = createContext();

const MyProvider = ({ children }) => {
  const [hlsLink, setHlsLink] = useState("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8");
  const [isActive, setIsActive] = useState(true);

  const handleSetIsActive = useCallback((status) => {
    setIsActive(status);
  }, []);

  return (
    <VideoContext.Provider value={{ hlsLink, setHlsLink, isActive, setIsActive: handleSetIsActive }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, MyProvider };
