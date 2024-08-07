const width = window.screen.width;
const height = window.screen.height;


    if (
      (width === 1280 && height === 720) 
    ) {
        require("./styles/720p.css");
    } else if (
      (width === 1920 && height === 1080) 
    ) {
        require("./styles/1080p.css");
    } else if (
      (width === 3840 && height === 2160) 
    ) {
        require("./styles/2160p.css");
    }  
    else{
       require("./styles/1080p.css");
    } 


 