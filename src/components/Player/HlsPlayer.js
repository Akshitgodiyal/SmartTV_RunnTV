import React, {useState, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import ToggleItem from '../ToogleItem';
import Focusable from '../../helper/Focusable';
import HorizontalList from '../../helper/HorizontalList';

const HlsPlayer = forwardRef((props, ref) => {
  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusButton: () => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  }));
  const [active, setActive] = useState(false);

  const assetClick = () => {
    var cc = localStorage.getItem("activeNav");
    if (cc !== props.parentNav) {
      return;
    }
    console.log("Asset clicked:", props.assetinfo);
    setActive(true);
    if (props.onClick) {
      props.onClick(props.assetinfo);
    }
  };

  const onKeyDown = () => {
    assetClick();
  };
  return (
    <div style={{ zIndex: "0" }} className="player-wrapper">
        <div className=' flex justify-center absolute top-0 right-40 bg-sky-500 bg-opacity-50 w-[80%] h-[10%] m-auto z-80 '>

            <HorizontalList className="w-full justify-center gap-3 items-center text-2xl flex"  retainLastFocus={true}>
            <ToggleItem className=" bg-blue-900" icon="user">Menu 1</ToggleItem>
            <ToggleItem className=" bg-blue-900" icon="user">Menu 1</ToggleItem>
            <ToggleItem icon="user">Menu 1</ToggleItem>
              


            </HorizontalList>


        </div>


      
      <ReactHlsPlayer
        className="video-player"
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        autoPlay={true}
        controls={false}
        width="100%"
        height="auto"
      />
    </div>
  );
});

export default HlsPlayer;
