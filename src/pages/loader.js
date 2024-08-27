import React from "react";

class LoaderScreen extends React.Component {
  render() {
    return (
      <div className="splash-screen" style={{ display: this.props.show ? "flex" : "none", position:"relative",background:"rgb(17 17 17 / 75%)",zIndex:"100" }}>
        <div className="animated-circle">
        </div>    
      </div>
    );
  }
}

export default LoaderScreen;