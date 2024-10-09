import React, { useState } from "react";
import Focusable from "../../helper/Focusable";




const Watchlisttoggle = (props) => {
  const [active, setActive] = useState(false);

  const assetClick = () => { 
    setActive(true); 
    props.onEnter(props?.log);
    if (props.onClick) {
      props.onClick(props.assetinfo);
    }
  };

  const onKeyDown = () => {  
    assetClick();
    if (props.onEnter) {
      props.onEnter(); // Call the passed callback function
     }
  };



  return (
    <Focusable
      onFocus={() => { setActive(true); props.onEnter(props?.log); }}
      onBlur={() => setActive(false) }
      onEnterDown={onKeyDown}
      onClick={onKeyDown}
      onBack={() => props.onBack()}
    >
     <div
            id={props.logincomp}
            className={
              "tab " +
              (active ? "active text-white " : "") +
              " "
            }
          >
            {props.children}
          </div>
    </Focusable>
  );
};

export default Watchlisttoggle;
