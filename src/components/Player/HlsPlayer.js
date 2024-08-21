import React, { useState, useRef, useImperativeHandle, forwardRef, useContext, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { VideoContext } from "../../utility/context";
import PlayerControls from "./PlayerControls";

const HlsPlayer = forwardRef(({ url }, ref) => {
  const playerRef = useRef();
  const buttonRef = useRef(null);


  useImperativeHandle(ref, () => ({
    focusButton: () => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    },
  }));
  const playVideo = () => {
    if (playerRef.current) {
      setTimeout(
        playerRef.current.play()
        ,100)
    }
  };
  useEffect(() => {

    if(url){
      playVideo();
    }
   
  },[url]); 
  return (
    <div style={{ zIndex: "0" }} className="player-wrapper"> 
      <ReactHlsPlayer
        className="video-player"
        playerRef={playerRef}
        src={url} 
        width="100%"
        height="auto"
      />
    </div>
  );
});

export default HlsPlayer;
