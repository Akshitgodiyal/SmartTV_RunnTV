import React from "react";
import _favourite from "../../assets/images/favorite.svg";
import _watchlist from "../../assets/images/saved.svg";
import _episodes from "../../assets/images/Episodes.svg";
import _audio from "../../assets/images/audio_change.svg";
import _start_over from "../../assets/images/Frame.svg";
import ControlToggle from "../Player/ControlToggle";

import { globals } from "../../global.js"
import ApiHelper from "../../helper/ApiHelper.js"

function ProgramDetail({ onBack, asset }) {
  const AddToFavourite = () => {
   // console.log(asset);
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
 

    // ApiHelper.get(globals.API_URL.ADD_TO_FAVORITE + asset.id, headers)
    //   .then((result) => {


    //   })
    //   .catch((error) => {
    //     console.log("Error====:", error);
    //   });
  };
  const AddToWaTchList = () => {
   // console.log(asset);
    const headers = {
      PARTNER_CODE: "ALL",
      userid: globals.getUserId(),
    };
    // ApiHelper.get(globals.API_URL.ADD_TO_WATCH_LIST + asset.id, headers)
    // .then((result) => {


    // })
    // .catch((error) => {
    //   console.log("Error====:", error);
    // });
  };
  return (
    <div>
      <div className="program-detail-container">
        <div className="program-detail-content">
          <div className="program-header">
            <div className="channel-logo">
              <img
                src={asset.baseSourceLocation + asset.image.poster.tv}
                alt="Channel Logo"
                className="channel-logo-img"
              />
            </div>
            <div className="channel-info">
              <div className="channel-title">{asset.title}</div>
              <div className="channel-category">
                {asset.categories?.[0]?.name || ""}
              </div>
            </div>
          </div>

          <div className="channel-description">{asset.description}</div>

          <div className="program-info">
            <div className="program-thumbnail">
              <img
                src={
                  asset.baseSourceLocation + asset.schedules?.[0]?.infoImages.tv
                }
                alt="Program Thumbnail"
                className="program-thumbnail-img"
              />
            </div>
            <div className="program-details truncate">
              <h2 className="program-title">
                {asset.schedules?.[0]?.programName || ""}
              </h2>
              <div className="program-rating">
                Rated {asset.schedules?.[0]?.ageRating || ""}
              </div>
              <div className="program-genre">
                {asset.schedules?.[0]?.genres?.[0]?.name || ""}
              </div>
            </div>
          </div>

          <div className="program-description">
            <div className="description-title">Description</div>
            <div className="description-content">
              {asset.schedules[0].description}
            </div>
          </div>

          <div className="control-toggle-container">
            <ControlToggle
              onBack={onBack}
              type={"detaildata"}
              onEnter={AddToFavourite}
              image={_favourite}
            >
              Add channel to favourites
            </ControlToggle>

            <ControlToggle
              onBack={onBack}
              type={"detaildata"}
              onEnter={AddToWaTchList}
              className={asset.isWatchListEnabled ? " " : "disabled-button"}
              image={_watchlist}
              disabled={!asset.isWatchListEnabled}
            >
              Add title to watchlist
            </ControlToggle>

            <ControlToggle
              onBack={onBack}
              type={"detaildata"}
              className="disabled-button"
              disabled="true"
              image={_episodes}
            >
              Episodes
            </ControlToggle>

            <ControlToggle
              onBack={onBack}
              type={"detaildata"}
              className={
                asset.languages && asset.languages.length > 1
                  ? " "
                  : "disabled-button"
              }
              disabled={!(asset.languages && asset.languages.length > 1)}
              image={_audio}
            >
              Change the Audio
            </ControlToggle>

            <ControlToggle
              onBack={onBack}
              type={"detaildata"}
              className={asset.isStartOverEnabled ? " " : "disabled-button"}
              disabled={!asset.isStartOverEnabled}
              image={_start_over}
            >
              Start Over
            </ControlToggle>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetail;
