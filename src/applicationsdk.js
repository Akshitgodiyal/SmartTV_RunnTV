window.APPLICATION_ENVIRONMENT = "BASE_API_DEV";
// window.APPLICATION_ENVIRONMENT = "BASE_API_PROD";

let APIDATA = {
  RUNN_TV: "runtv/",
  VERSION: "v1/",
};
let ID = {
  BASE_API_DEV: "https://prod-epg.runn.tv/",
  BASE_API_PROD: "https://prod-epg.runn.tv/",
};
var BASE_RUNN_API = null;
if (typeof window.APPLICATION_ENVIRONMENT !== "undefined") {
    switch (window.APPLICATION_ENVIRONMENT) {
      case "BASE_API_PROD":
        BASE_RUNN_API = ID.BASE_API_PROD;
        break;
      case "BASE_API_PREPROD":
        //this.BASE_RUNN_API = ID.BASE_API_PREPROD;
        break;
      case "BASE_API_QA":
        //this.BASE_RUNN_API = ID.BASE_API_QA;
        break;
      case "BASE_API_DEV":
        BASE_RUNN_API = ID.BASE_API_DEV;
        break;
      default:
          (BASE_RUNN_API = null);
          break;
    } 
  }
 
 
export const BASE_URL = BASE_RUNN_API + APIDATA.RUNN_TV + APIDATA.VERSION;
