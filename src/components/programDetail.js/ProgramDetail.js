import React from "react";
import discover from "../../assets/images/discover.png";
import ControlToggle from "../Player/ControlToggle";


function ProgramDetail({ onBack }) {
  return (
    <div className="program-detail-container">
      <div className="program-detail-content">
        <div className="program-header">
          <div className="channel-logo">
            <img
              src="https://via.placeholder.com/60"
              alt="Channel Logo"
              className="channel-logo-img"
            />
          </div>
          <div className="channel-info">
            <div className="channel-title">ZEE5 TV</div>
            <div className="channel-category">Family Entertainment</div>
          </div>
        </div>

        <div className="channel-description">
          24 hour Hindi General Entertainment Channel that provides complete
          family entertainment.
        </div>

        <div className="program-info">
          <div className="program-thumbnail">
            <img
              src="https://via.placeholder.com/60"
              alt="Program Thumbnail"
              className="program-thumbnail-img"
            />
          </div>
          <div className="program-details">
            <h2 className="program-title">Kumkum Bhagya</h2>
            <div className="program-rating">Rated U/A - 13+</div>
            <div className="program-genre">Drama • Emotional • Suspense</div>
          </div>
        </div>

        <div className="program-description">
          <div className="description-title">Description</div>
          <div className="description-content">
            Sarla Arora, who runs a marriage hall, hopes to see her daughters,
            Pragya and Bulbul, married. The sisters have their own dreams and
            ambitions but it all changes when Purab and Abhi enter their lives.
          </div>
        </div>

        <div className="control-toggle-container">
          <ControlToggle onBack={onBack} type={"detaildata"} className="control-toggle" image={discover}>
            Add channel to favourite
          </ControlToggle>
          <ControlToggle onBack={onBack} type={"detaildata"} className="control-toggle" image={discover}>
            Add title to watchlist
          </ControlToggle>
          <ControlToggle onBack={onBack} type={"detaildata"} className="control-toggle" image={discover}>
            Episodes
          </ControlToggle>
          <ControlToggle onBack={onBack} type={"detaildata"} className="control-toggle" image={discover}>
            Change the Audio
          </ControlToggle>
          <ControlToggle onBack={onBack} type={"detaildata"} className="control-toggle" image={discover}>
            Start Over
          </ControlToggle>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetail;
