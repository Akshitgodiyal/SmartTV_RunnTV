import React, { useContext, useEffect, useState } from "react";
import HlsPlayer from "./HlsPlayer";
import PlayerControls from "./PlayerControls";
import { VideoContext } from "../../utility/context";

function Player({ url,poster }) {
  return (
    <div>
      <HlsPlayer url={url} poster={poster}/>
    </div>
  );
}
export default Player;
