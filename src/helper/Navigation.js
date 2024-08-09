import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalList from './VerticalList.js';

const reverseDirection = {
  'up': 'down',
  'down': 'up',
  'left': 'right',
  'right': 'left'
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

  onKeyDown = (evt) => {
    if (this.pause || evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
      return;
    }

    const preventDefault = () => {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    };

    const direction = this.props.keyMapping[evt.keyCode];

    if (!direction) {
      if (evt.keyCode === this.props.keyMapping['enter']) {
        if (this.currentFocusedPath) {
          if (!this.fireEvent(this.getLastFromPath(this.currentFocusedPath), 'enter-down')) {
            return preventDefault();
          }
        }
      }
      return;
    }

    let currentFocusedPath = this.currentFocusedPath;

    if (!currentFocusedPath || currentFocusedPath.length === 0) {
      currentFocusedPath = this.lastFocusedPath;

      if (!currentFocusedPath || currentFocusedPath.length === 0) {
        return preventDefault();
      }
    }

    this.focusNext(direction, currentFocusedPath);
    return preventDefault();
  }

  fireEvent(element, evt, evtProps) {
    switch (evt) {
      case 'willmove':
        if (element.props.onWillMove)
          element.props.onWillMove(evtProps);
        break;
      case 'onfocus':
        element.focus(evtProps);
        break;
      case 'onblur':
        element.blur(evtProps);
        break;
      case 'enter-down':
        if (element.props.onEnterDown)
          element.props.onEnterDown(evtProps, this);
        break;
      default:
        return false;
    }
    return true;
  }

  focusNext(direction, focusedPath) {
    const current = this.getLastFromPath(focusedPath);
    const next = current.getNextFocusFrom(direction);

    // Prevent navigation left if conditions are met
    if (this.preventLeft(direction, current)) {
      return;
    }
    if (this.preventTop(direction, current)) {
      return;
    }

    if (next) {
      this.lastDirection = direction;
      this.focus(next);
    }
  }
 

  preventLeft(direction, current) {
    let prevent = false;
    const activeComponent = localStorage.getItem("ACTIVE_COMPONENT") || null;

    if (direction === "left") {
      switch (activeComponent) {
        case "player-controls":
          if (current && current.indexInParent === 0) {
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
    const activeComponent = localStorage.getItem("ACTIVE_COMPONENT") || null;

    if (direction == "up") {
      switch (activeComponent) {
        case "discover":
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

  blur(nextTree) {
    if (this.currentFocusedPath === null) return;

    let changeNode = null;

    for (let i = 0; i < Math.min(nextTree.length, this.currentFocusedPath.length); ++i) {
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
        this.currentFocusedPath[i].lastFocusChild = this.currentFocusedPath[i + 1].indexInParent;
      }
    }
  }

  focus(next) {
    if (next === null) {
      console.warn('Trying to focus a null component');
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
      id = 'focusable-' + this.focusableIds++;
    }

    this.focusableComponents[id] = component;
    return id;
  }

  forceFocus(focusableId) {
    if (!this.focusableComponents[focusableId]) {
      throw new Error('Focusable component with id "' + focusableId + '" doesn\'t exist!');
    }

    this.focus(this.focusableComponents[focusableId].getDefaultFocus());
  }

  removeFocusableId(focusableId) {
    if (this.focusableComponents[focusableId])
      delete this.focusableComponents[focusableId];
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.focusDefault();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('keydown', this.onKeyDown);
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
      <VerticalList ref={(element) => (this.root = element)} focusId="navigation">
        {this.props.children}
      </VerticalList>
    );
  }
}

Navigation.defaultProps = {
  keyMapping: {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    'enter': 13,
  },
};

Navigation.childContextTypes = {
  navigationComponent: PropTypes.object,
};

export default Navigation;
