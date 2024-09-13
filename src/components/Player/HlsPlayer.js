import React, { useRef, useContext, useEffect, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { VideoContext } from "../../utility/context";

const HlsPlayer = React.forwardRef(() => {
  const [url, setUrl] = useState("");
  const [poster, setPoster] = useState("");
  const playerRef = useRef();
  const { setBufferedEnd } = useContext(VideoContext);
  const { selectedAsset } = useContext(VideoContext);

  // Update player on selectedAsset change
  useEffect(() => {
    if (selectedAsset && selectedAsset.playUrl !== url) {
      // Clear the current player reference and re-initialize the player
      if (playerRef.current) {
        // Manually destroy the player to ensure proper cleanup
        playerRef.current.pause();
        playerRef.current.removeAttribute('src'); // Remove the current source
        playerRef.current.load(); // Reset the player
      }

      // Set new URL and poster
      setUrl(selectedAsset.playUrl);
      setPoster(selectedAsset.baseSourceLocation + selectedAsset.image.poster.tv);
    }
  }, [selectedAsset]);

  useEffect(() => {
    const player = playerRef.current;
    if (url && player) {
      const handlePlay = () => {
        setTimeout(() => {
          try {
            player.muted = false;
            player.play().catch((error) => {
              console.error("Playback failed after unmuting:", error);
            });
          } catch (error) {
            console.error("Failed to unmute:", error);
          }
        }, 500);
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
      localStorage.setItem("player_currentTime", player.currentTime);
    };

    const handleBufferUpdate = () => {
      const buffer = player.buffered;
      if (buffer.length > 0) {
        const bufferedEnd = buffer.end(buffer.length - 1);
        setBufferedEnd(bufferedEnd);
      }
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("progress", handleBufferUpdate);

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("progress", handleBufferUpdate);
    };
  }, []);

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
        liveSyncPosition={-1}
      />
    </div>
  );
});

export default HlsPlayer;
