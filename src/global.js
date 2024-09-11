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
    },
    API_URL:{ 
        GET_CHANNEL_EPG:BASE_URL +"schedule/getChannelEpg",
        GET_HOME_PAGE_CATEGORY: localStorage.getItem("IsKidsSafe")=="true"?BASE_URL +"genre/filters/kidSafe":BASE_URL +"genre/filters",
        GET_EPG_BY_FILTER_ID:BASE_URL + "schedule/getEpgByFilters/",
    },
    getUserId:function(){
        return "814b3509-2309-4e7c-b903-dc09389f7fbd";
    }
}