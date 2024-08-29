import React, { useContext, useEffect, useState } from "react";
import HlsPlayer from "./HlsPlayer";
import PlayerControls from "./PlayerControls";
import { VideoContext } from "../../utility/context";

function Player({ selectedAsset }) {
  return (
    <div>
      <HlsPlayer selectedAsset={selectedAsset}/>
    </div>
  );
}
export default Player;
