import React, { useContext, useEffect } from "react";  

function Watchlist({ show,backtohome }) {
  return (
    <div
    className={
      "mainbox overflow-y-auto bg-black " + (show ? "" : "hidden")
    }
    
      style={{ position: "absolute", top: "0" }}
    >
    
    </div>
  );
}

export default Watchlist;
