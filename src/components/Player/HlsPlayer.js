import React, { useRef, useImperativeHandle, forwardRef, useContext, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { VideoContext } from "../../utility/context";
import bg from "../../assets/images/tvbg.jpg";

const HlsPlayer = forwardRef(({ url, poster }, ref) => {
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    playVideo: () => {
      if (playerRef.current) {
        playerRef.current
          .play()
          .then(() => {
            console.log("Playback started successfully");
          })
          .catch((error) => {
            console.error("Playback failed:", error);
          });
      }
    },
  }));

  useEffect(() => {
    if (url && playerRef.current) {
      ref.current.playVideo();
      // Unmute the video after a brief delay
      setTimeout(() => {
        playerRef.current.muted = false;
      }, 500);
    }
  }, [url, ref]);

  return (
    <div style={{ zIndex: "0" }} className="player-wrapper">
      <ReactHlsPlayer
        className="video-player"
        id="player"
        ref={playerRef}
        src={url}
        width="100%"
        height="auto"
        poster={poster}
        muted={true} // Mute the video by default for autoplay
        playsInline
        controls={false}
        autoPlay={true} // Autoplay the video
      />
    </div>
  );
});

export default HlsPlayer;
