import React, { Component } from "react";
import PropTypes from "prop-types";
import VerticalList from "./VerticalList.js";
import { globals } from "../global.js";
import { scrolling } from "../components/privacy/privacyPage.js";
import { debounce } from "lodash"; 

const reverseDirection = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

class Navigation extends Component {
  currentFocusedPath = null;
  lastFocusedPath = null;
  lastDirection = null;
  pause = false;
  default = null;
  root = null;
  focusableComponents = {};
  focusableIds = 0;

  constructor(props) {
    super(props);
    // Debounce the onKeyDown function
    this.onKeyDown = debounce(this.onKeyDown.bind(this), 100); // Adjust the delay as needed
  }
  onKeyDown = (evt) => {
    if (
      this.pause ||
      evt.altKey ||
      evt.ctrlKey ||
      evt.metaKey ||
      evt.shiftKey
    ) {
      return;
    }

    const preventDefault = () => {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    };
    var loaderScreen = document.getElementById("loaderScreen");
    if (
      loaderScreen &&
      loaderScreen.style.display &&
      loaderScreen.style.display === "flex"
    ) {
      return;
    }
    const direction = this.props.keyMapping[evt.keyCode];
    let currentFocusedPath = this.currentFocusedPath;
    if (evt.keyCode == 8) {
      if (this.currentFocusedPath) {
        // Trigger the back event on the focused component
        if (
          this.fireEvent(this.getLastFromPath(this.currentFocusedPath), "back")
        ) {
          return preventDefault();
        }
      }
    }
    if (evt.keyCode === 13) {
      if (this.currentFocusedPath) {
        if (
          !this.fireEvent(
            this.getLastFromPath(this.currentFocusedPath),
            "enter-down"
          )
        ) {
          return preventDefault();
        }
      }
    }
    if (evt.keyCode === 13) {
      if (this.getLastFromPath(this.currentFocusedPath) && this.getLastFromPath(this.currentFocusedPath).props && this.getLastFromPath(this.currentFocusedPath).props.disabled) {
        this.focusNext(
          this.getLastFromPath(this.currentFocusedPath).props.allowedDirection,
          currentFocusedPath
        );
      }
      return;
    }

    if (!currentFocusedPath || currentFocusedPath.length === 0) {
      currentFocusedPath = this.lastFocusedPath;

      if (!currentFocusedPath || currentFocusedPath.length === 0) {
        return preventDefault();
      }
    }

    this.focusNext(direction, currentFocusedPath);
    return preventDefault();
  };

  fireEvent(element, evt, evtProps) {

    
    switch (evt) {
      case "willmove":
        if (element.props.onWillMove) element.props.onWillMove(evtProps);
        break;
      case "onfocus":
        element.focus(evtProps);
        break;
      case "onblur":
        element.blur(evtProps);
        break;
      case "enter-down":
        if (element.props.onEnterDown)
          element.props.onEnterDown(evtProps, this);

        break;
      case "back":
        if (element.handleBack) element.handleBack();
        break;
      default:
        return false;
    }
    return true;
  }

  focusNext(direction, focusedPath) {
    const current = this.getLastFromPath(focusedPath);
    // Prevent navigation left if conditions are met
    if (this.preventLeft(direction, current)) {
      return;
    }
    if (this.preventTop(direction, current)) {
    }
    if (this.preventDown(direction, current)) {
    }

    const activeComponent =
    localStorage.getItem(globals.ACTIVE_COMPONENT) || null;
    

    if (activeComponent === globals.COMPONENT_NAME.scroll_item) {
      const result = scrolling(direction);

      if (result === "Reached bottom") {
        const next = current.getNextFocusFrom(direction);
        if (next) {
          this.lastDirection = direction;
          this.focus(next);
          if (next.props.disabled) {
            const nextRight = next.getNextFocusFrom("right");
            if (nextRight && next.props.parentId === nextRight.props.parentId) {
              this.focus(nextRight);
            }
            const nextLeft = next.getNextFocusFrom("left");
            if (nextLeft && next.props.parentId === nextLeft.props.parentId) {
              this.focus(nextLeft);
            }
          }
        }
      } else if (result === "Reached top") {
        const next = current.getNextFocusFrom(direction);
        if (next) {
          this.lastDirection = direction;
          this.focus(next);
          if (next.props.disabled) {
            const nextRight = next.getNextFocusFrom("right");
            if (nextRight && next.props.parentId === nextRight.props.parentId) {
              this.focus(nextRight);
            }
            const nextLeft = next.getNextFocusFrom("left");
            if (nextLeft && next.props.parentId === nextLeft.props.parentId) {
              this.focus(nextLeft);
            }
          }
        }
      } else {
        if (direction == "up" || direction == "down") {

        } else {
          const next = current.getNextFocusFrom(direction);
          if (next) {
            this.lastDirection = direction;
            this.focus(next);
            if (next.props.disabled) {
              const nextRight = next.getNextFocusFrom("right");
              if (
                nextRight &&
                next.props.parentId === nextRight.props.parentId
              ) {
                this.focus(nextRight);
              }
              const nextLeft = next.getNextFocusFrom("left");
              if (nextLeft && next.props.parentId === nextLeft.props.parentId) {
                this.focus(nextLeft);
              }
            }
          }
        }
      }
    } else {
      
      const next = current.getNextFocusFrom(direction);
      if (next) {
        this.lastDirection = direction;
      
        setTimeout(() => {
          if (next.props.disabled) {
           // if(direction==="right" || direction==="left"){
              const nextRight = next.getNextFocusFrom("right");
              if (nextRight && next.props.parentId === nextRight.props.parentId) {
                this.focus(nextRight);
                return;
              }
              const nextLeft = next.getNextFocusFrom("left");
              if (nextLeft && next.props.parentId === nextLeft.props.parentId) {
                this.focus(nextLeft);
                return;
              }
              let _next = next.getNextFocusFrom(direction); 
              while (_next.props.disabled) { 
                // Update _next in case the focus changes
                _next = _next.getNextFocusFrom(direction);
              }
              this.focus(_next);
              return;
          }
          this.focus(next);
        }, 1);
        
      }
    }
  } 
  preventLeft(direction, current) {
    let prevent = false;
    const activeComponent =
      localStorage.getItem(globals.ACTIVE_COMPONENT) || null;

    if (direction == "left") {
      switch (activeComponent) {
        case globals.COMPONENT_NAME.Player_Control:
          if (current && current.indexInParent === 0) {
            prevent = true;
          }
          break;
        case globals.COMPONENT_NAME.Player_Detail:
          if (current) {
            prevent = true;
          }
          break;
        default:
          prevent = false;
          break;
      }
    }

    return prevent;
  }
  preventTop(direction, current) {
    let prevent = false;
    const activeComponent =
      localStorage.getItem(globals.ACTIVE_COMPONENT) || null;

    
    if (direction == "up") {
      switch (activeComponent) {
        case globals.COMPONENT_NAME.Discover:
          if (current) {
            prevent = true;
          }
          break;
        case globals.COMPONENT_NAME.Player_Control:
          if (current) {
            prevent = true;
          }
        case globals.COMPONENT_NAME.scroll_item:
          if (current) {
            prevent = true;
          }
          break;
        case globals.COMPONENT_NAME.Content:
          if (localStorage.getItem("isplayerShow") == "true" ) {
       
        
            this.props.showVideoSlider();
          }
        case globals.COMPONENT_NAME.Category_Filter:
          if (localStorage.getItem("isplayerShow") == "true" ) {
       
        
            this.props.showVideoSlider();
          }
          break;
        default:
          prevent = false;
          break;
      }
   
     

    }

    return prevent;
  }
  preventDown(direction, current) {
    let prevent = false;
    const activeComponent =
      localStorage.getItem(globals.ACTIVE_COMPONENT) || null;

    if (direction == "down") {
      switch (activeComponent) {
        case globals.COMPONENT_NAME.scroll_item:
          if (current) {
            prevent = true;
          }
          break;
          case globals.COMPONENT_NAME.Player_Control:
            if (current) {
              if (localStorage.getItem("isplayerShow") === "true" ) {
              
                
                 
                       this.props.activemenuActive();
                     }
            }
           
          break;
        default:
          prevent = false;
          break;
      }
    
 
    }

    return prevent;
  }
  blur(nextTree) {
    if (this.currentFocusedPath === null) return;

    let changeNode = null;

    for (
      let i = 0;
      i < Math.min(nextTree.length, this.currentFocusedPath.length);
      ++i
    ) {
      if (nextTree[i] !== this.currentFocusedPath[i]) {
        changeNode = i;
        break;
      }
    }

    if (changeNode === null) return;

    for (let i = changeNode; i < this.currentFocusedPath.length; ++i) {
      if (this.currentFocusedPath[i].focusableId === null) continue;
      this.currentFocusedPath[i].blur();
      if (i < this.currentFocusedPath.length - 1) {
        this.currentFocusedPath[i].lastFocusChild =
          this.currentFocusedPath[i + 1].indexInParent;
      }
    }
  }

  focus(next) {
    if (next === null) {
      console.warn("Trying to focus a null component");
      return;
    }

    this.blur(next.treePath);

    next.focus();
    
    const lastPath = this.currentFocusedPath;
    this.currentFocusedPath = next.treePath;
    this.lastFocusedPath = lastPath;
  }

  getLastFromPath(path) {
    return path[path.length - 1];
  }

  focusDefault() {
    if (this.default !== null) {
      this.focus(this.default.getDefaultFocus());
    } else {
      this.focus(this.root.getDefaultFocus());
    }
  }

  setDefault(component) {
    this.default = component;
  }

  addComponent(component, id = null) {
    if (this.focusableComponents[id]) {
      return id;
    }

    if (!id) {
      id = "focusable-" + this.focusableIds++;
    }

    this.focusableComponents[id] = component;
    return id;
  }

  forceFocus(focusableId) {
    if (!this.focusableComponents[focusableId]) {
      throw new Error(
        'Focusable component with id "' + focusableId + "\" doesn't exist!"
      );
    }

    this.focus(this.focusableComponents[focusableId].getDefaultFocus());
  }

  removeFocusableId(focusableId) {
    if (this.focusableComponents[focusableId])
      delete this.focusableComponents[focusableId];
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    this.focusDefault();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate() {
    // Handle updates if necessary
  }

  getChildContext() {
    return { navigationComponent: this };
  }

  getRoot() {
    return this.root;
  }

  render() {
    return (
      <VerticalList
        ref={(element) => (this.root = element)}
        focusId="navigation"
      >
        {this.props.children}
      </VerticalList>
    );
  }
}

Navigation.defaultProps = {
  keyMapping: {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    13: "enter",
    8: "back",
  },
};

Navigation.childContextTypes = {
  navigationComponent: PropTypes.object,
};

export default Navigation;
