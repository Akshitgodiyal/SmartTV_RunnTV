import React, { useState, useRef, useImperativeHandle, forwardRef, useContext, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { VideoContext } from "../../utility/context";
import PlayerControls from "./PlayerControls";

const HlsPlayer = forwardRef(({ url }, ref) => {
  const buttonRef = useRef(null);


  useImperativeHandle(ref, () => ({
    focusButton: () => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    },
  }));




  return (
    <div style={{ zIndex: "0" }} className="player-wrapper">
     
      <ReactHlsPlayer
        className="video-player"
        src={url}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
});

export default HlsPlayer;
