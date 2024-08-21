import {BASE_URL} from './applicationsdk'
export const globals={
    ACTIVE_COMPONENT:"ACTIVE_COMPONENT",
    COMPONENT_NAME:{
        Sidebar:"sidebarComponent",
        Category_Filter:"filterComponent",
        Content:"content",
        Discover:"discover",
        Player_Control:"player-controls"
    },
    API_URL:{ 
        GET_CHANNEL_EPG:BASE_URL +"schedule/getChannelEpg"
    }
}