import React, { useContext, useEffect, useState } from 'react'
import HlsPlayer from './HlsPlayer'
import PlayerControls from './PlayerControls';
import { VideoContext } from '../../utility/context';

 function Player({url}) {
    // const { hlsLink } = useContext(VideoContext);
   

// console.log("url",url);

//   const [url, setUrl] = useState("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8");


  return ( 
    <div> 
        {/* <HlsPlayer url={url}  /> */}
        <PlayerControls />
        
    </div>
  )
}
export default Player