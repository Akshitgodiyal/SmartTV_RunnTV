import React, { useContext, useEffect, useState } from 'react'
import HlsPlayer from './HlsPlayer'
import PlayerControls from './PlayerControls';
import { VideoContext } from '../../utility/context';

 function Player({url}) {

   
  return ( 
    <div> 
        <HlsPlayer url={url}  />
    
        
    </div>
  )
}
export default Player