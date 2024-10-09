import React, { useState } from "react";
import Focusable from "../../helper/Focusable";
import { img_cloudfront1 } from "../../utility/constant";
import Grid from "../../helper/Grid";

const GridItem = (props) => {
   const [active, setActive] = useState(false);

  // Handles asset click event
  const assetClick = (id) => {
    localStorage.setItem("LastFocusedItemId", id);
    if (props.onClick) {
      props.onClick(props.assetinfo); // Calls parent-provided click handler
    }
  };

  // Handles key down event (Enter key press)
  const onKeyDown = (id) => {
    assetClick(id); // Triggers asset click on Enter press
    if (props.onEnter) {
      props.onEnter(); // Optional: Calls parent-provided "onEnter" handler
    }
  };
  const onFocus=()=>{
    setActive(true)
  }
  return (

    
    <Focusable
      onFocus={()=>onFocus() } // Handles focus state
      onBlur={() => setActive(false)} // Handles blur state
      onEnterDown={() =>
        onKeyDown(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      } // Handle key press (Enter)
      onClick={() =>
        assetClick(
          props.assetinfo && props.assetinfo.id ? props.assetinfo.id : ""
        )
      } // Handle click
      onBack={() => props.onBack()} // Handle back action
    >
      <div
        className={
          "item grid-item " +
          (active ? "item-focus " : "")  
        }
      >
        <div className="">
           Element {props.key}
          
        </div>
      </div>

    </Focusable>
  );
};

export default GridItem;
