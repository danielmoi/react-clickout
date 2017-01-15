import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const wrapWithClickOut = (ToWrap) => {
  class ClickOut extends Component {
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
        typeof wrappedComponent.handleClickOut === 'function'
      ) {
        wrappedComponent.handleClickOut(e);
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
  return ClickOut;
};

export default wrapWithClickOut;

