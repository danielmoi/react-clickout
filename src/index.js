import React, { Component } from 'react';

const wrapWithClickout = (ToWrap) => {
  class Clickout extends Component {
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
      const wrapperNode = this.wrapperNode;
      const wrappedComponent = this.wrappedComponent;

      if ((!wrapperNode || !wrapperNode.contains(e.target)) &&
        typeof wrappedComponent.handleClickout === 'function'
      ) {
        wrappedComponent.handleClickout(e);
      }
    }

    render() {
      return (
        <div ref={(r) => { this.wrapperNode = r; }}>
          <ToWrap
            {...this.props}
            ref={(c) => { this.wrappedComponent = c; }}
          />
        </div>
      );
    }
  }
  return Clickout;
};

export default wrapWithClickout;

