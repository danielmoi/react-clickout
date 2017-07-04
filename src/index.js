import React, { Component } from 'react';
import classNames from 'classnames';

const wrapWithClickout = (ToWrap, opts = {}) => {
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
        const flag = e.target.dataset.reactClickout;
        if (flag === 'exclude') return;

        wrappedComponent.handleClickout(e);
      }
    }

    render() {
      const { wrapperStyle } = opts;
      const wrapperStyles = {
        rc__wrapper: true,
        [wrapperStyle]: wrapperStyle,
      };
      return (
        <div
          ref={(r) => { this.wrapperNode = r; }}
          className={classNames(wrapperStyles)}
        >
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

