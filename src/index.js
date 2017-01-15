import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const wrapWithClickOutside = (ToWrap) => {
  class ClickOutside extends Component {
    constructor() {
      super();
      this.handler = this.handler.bind(this);
    }

    componentDidMount() {
      document.addEventListener('click', this.handler, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handler, true);
    }

    handler(e) {
      const wrapperNode = ReactDOM.findDOMNode(this);
      const wrappedComponent = this.wrappedComponent;

      if ((!wrapperNode || !wrapperNode.contains(e.target)) &&
        typeof wrappedComponent.handleClickOutside === 'function'
      ) {
        wrappedComponent.handleClickOutside(e);
      }
    }

    render() {
      return (
        <ToWrap
          {...this.props}
          ref={c => { this.wrappedComponent = c; }}
        />
      );
    }
  }
  return ClickOutside;
};

export default wrapWithClickOutside;

