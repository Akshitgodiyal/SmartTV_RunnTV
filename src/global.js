import {BASE_URL} from './applicationsdk'
export const globals={
    ACTIVE_COMPONENT:"ACTIVE_COMPONENT",
    COMPONENT_NAME:{
        Sidebar:"sidebarComponent",
        Category_Filter:"filterComponent",
        Content:"content",
        Discover:"discover",
        Search:"search",
        Player_Control:"player-controls",
        Player_Detail:"detail-data",
        scroll_item:"scroll-data",
        full_screen:"full-screen",
        exitpopup:"exit-popup",
        logoutpopup:"logout-popup",
    },
    API_URL:{ 
        GET_CHANNEL_EPG:BASE_URL +"schedule/getChannelEpg",
       // GET_HOME_PAGE_CATEGORY:this.API_URL.getHOMEPAGECATEGORY(),
        GET_EPG_BY_FILTER_ID:BASE_URL + "schedule/getEpgByFilters/",
        ADD_TO_FAVORITE:BASE_URL + "favourite",
        REMOVE_FROM_FAVORITE:BASE_URL + "favourite/remove",
        GET_FAVORITE_LIST:BASE_URL + "favourite/getByDeviceId/",

        ADD_TO_WATCH_LIST:BASE_URL + "watchlist/add",
        REMOVE_FROM_WATCH_LIST:BASE_URL + "watchlist/remove",
        GET_WATCH_LIST:BASE_URL + "watchlist/getByUserId/",

        GET_RECENT_LIST:BASE_URL + "recentlist/getByUserId/",
        Generate_Code:BASE_URL + "auth/tv/generate-code",
        CHECK_STATUS:BASE_URL + "auth/tv/check-status",
        
        GET_EPG_BY_CATEGORY_ID:BASE_URL + "schedule/getEpgByFilters/",
        GET_EPG_BY_GENRE_ID:BASE_URL + "schedule/getEpgByFilters/",
        GET_EPG_BY_LANGUAGE_ID:BASE_URL + "schedule/getEpgByFilters/",
        getHOMEPAGECATEGORY:function(){
            if(localStorage.getItem("IsKidsSafe")=="true"){
               return BASE_URL +"genre/filters/kidSafe";
            }else{
               return BASE_URL +"genre/filters";
            }
        }
    },
    getUserId:function(){
        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if(userDetails && userDetails.tvDeviceId){
          return userDetails.tvDeviceId;
        }else{
          return this.getDeviceId();
        } 
    },
    getDeviceId:function(){
        var deviceId =  localStorage.getItem("deviceId");
        if(deviceId){
          return deviceId;
        }else{
            return this.setDeviceId();
        }
        
    },
    setDeviceId:function(){ 
      var deviceId=this.generateGUID();
      localStorage.setItem("deviceId",deviceId)
      return deviceId;
    },
    generateGUID: function() {
        // Generate a random GUID using the crypto API
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (c === 'x' ? 0 : 1);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

}