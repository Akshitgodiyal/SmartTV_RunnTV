import React, { useRef, useImperativeHandle, forwardRef, useContext, useEffect, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { VideoContext } from "../../utility/context";
import bg from "../../assets/images/tvbg.jpg";

const HlsPlayer = React.forwardRef(({selectedAsset}, ref) => {
const [url, setUrl] = useState("");
const [poster, setPoster] = useState("");
const playerRef = useRef(null);
  useImperativeHandle(ref, () => ({
    playVideo: () => {
      if (playerRef.current) {
        playerRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      }
    },
  }));
// console.log(url);
// useEffect(() => {
//   if (url && playerRef.current) {
//     ref.current.playVideo();
//   }
// }, [url, ref]); 

useEffect(()=>{
  if(selectedAsset){
    debugger;
    setUrl(selectedAsset.playUrl);
    setPoster(selectedAsset.baseSourceLocation +   selectedAsset.image.poster.tv );
  }
},[selectedAsset])

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
        muted={false}
        playsInline
        controls={false}
      />
    </div>
  );
});

export default HlsPlayer;
