import React, { useRef, useImperativeHandle, forwardRef, useContext, useEffect,useState } from "react";
import ReactHlsPlayer from "react-hls-player";

const HlsPlayer = React.forwardRef(({selectedAsset, onTimeUpdate, onBufferUpdate }, ref) => {
const [url, setUrl] = useState("");
const [poster, setPoster] = useState("");
const playerRef = useRef();
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

useEffect(()=>{
  if(selectedAsset){ 
    setUrl(selectedAsset.playUrl);
    setPoster(selectedAsset.baseSourceLocation +   selectedAsset.image.poster.tv );
  }
},[selectedAsset])

  useEffect(() => {
    const player = playerRef.current; 
    if (url && player) {
      const handlePlay = () => {
        console.log("Video started");

        // Attempt to unmute the video after it starts playing
        setTimeout(() => {
          try {
            player.muted = false;
            console.log("Video unmuted");

            // Attempt to resume playback after unmuting (this may still fail on some browsers)
            player.play().catch((error) => {
              console.error("Playback failed after unmuting:", error);
            });
          } catch (error) {
            console.error("Failed to unmute:", error);
          }
        }, 500); // Adjust this delay as needed
      };

      player.addEventListener("play", handlePlay);

      return () => {
        player.removeEventListener("play", handlePlay);
      };
    }
  }, [url]);

  useEffect(() => {
    const player = playerRef.current; 
    const handleTimeUpdate = () => {
        if (onTimeUpdate) {
            onTimeUpdate(player.currentTime);
        }
    };

    const handleBufferUpdate = () => {
        if (onBufferUpdate) {
            const buffer = player.buffered;
            if (buffer.length > 0) {
                const bufferedEnd = buffer.end(buffer.length - 1);
                onBufferUpdate(bufferedEnd);
            }
        }
    };
    player.addEventListener('timeupdate', handleTimeUpdate);
    player.addEventListener('progress', handleBufferUpdate);

    return () => {
        player.removeEventListener('timeupdate', handleTimeUpdate);
        player.removeEventListener('progress', handleBufferUpdate);
    };
  }, [onTimeUpdate, onBufferUpdate]);

  return (
    <div style={{ zIndex: "0" }} className="player-wrapper">
      <ReactHlsPlayer
        className="video-player"
        id="player"
        playerRef={playerRef}
        src={url}
        width="100%"
        height="auto"
        poster={poster}
        muted={true} // Start muted to comply with autoplay policies
        playsInline
        controls={false}
        autoPlay={true} // Autoplay the video
        liveSyncPosition={-5} // Live sync to the edge, with a delay of 5 seconds
      />
    </div>
  );
});

export default HlsPlayer;
