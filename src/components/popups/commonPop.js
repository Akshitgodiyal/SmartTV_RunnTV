import React, { useEffect } from "react";

import HorizontalList from "../../helper/HorizontalList";
import CommonToggle from "../CommonToggle";

const CommonPop = ({ onCancel, onConfirm }) => {
  let popSection = document.getElementById("exitcomp");
  useEffect(() => {
    setTimeout(() => {
      let popSection = document.getElementById("exitcomp");

      if (popSection) {
        localStorage.setItem("screenLoaded", true);
        popSection.click();

        localStorage.setItem("screenLoaded", false);
      }
    }, 300);
  }, [popSection != null]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div>
          <div className="modal-text">Do you want to exit the RunnTV app?</div>

          <HorizontalList>
            <div className="button-group">
              <CommonToggle
                logincomp={"exitcomp"}
                onEnter={() => onCancel(false)}
                onBack={() => onCancel(false)}
              >
                <div
                  className="btn cancel-btn"
                  //    onClick={onCancel}
                >
                  Cancel
                </div>
              </CommonToggle>

              <CommonToggle
                onEnter={() => onCancel(false)}
                onBack={() => onCancel(false)}
              >
                <div
                  className="btn confirm-btn"

                  //   onClick={onConfirm}
                >
                  Ok
                </div>
              </CommonToggle>
            </div>
          </HorizontalList>
        </div>
      </div>
    </div>
  );
};

export default CommonPop;
