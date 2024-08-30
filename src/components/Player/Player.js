import React, { useContext, useEffect, useState } from "react";
import HlsPlayer from "./HlsPlayer";
import PlayerControls from "./PlayerControls";
import { VideoContext } from "../../utility/context";

function Player({ selectedAsset,onTimeUpdate,onBufferUpdate }) {
  return (
    <div>
      <HlsPlayer selectedAsset={selectedAsset}
      onTimeUpdate={onTimeUpdate}
      onBufferUpdate={onBufferUpdate}
      />
    </div>
  );
}
export default Player;
