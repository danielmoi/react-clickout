# React Clickout

[![Build Status](https://travis-ci.org/danielmoi/react-clickout.svg?branch=master)](https://travis-ci.org/danielmoi/react-clickout)
[![npm version](https://badge.fury.io/js/react-clickout.svg)](https://badge.fury.io/js/react-clickout)

Higher Order Component providing clickout functionality for React components.

## Installation
With Yarn:
```
yarn add react-clickout
```

With NPM:
```
npm install react-clickout
```

## Usage
`react-clickout` returns a Higher Order Component that wraps a provided component with the ability to detect a `click` event outside of that component.

Such a "`clickout`" event will call the wrapped component's `handleClickout` method. (Note the character casing.)

See the test suite for more detailed example usage.

```js
import React, { PropTypes, Component } from 'react';
import wrapWithClickout from 'react-clickout';

class ToWrap extends Component {
  constructor() {
    ...
    this.state = {
      isVisible: true,
    };
  }
  handleClickout() {
    this.setState({
      isVisible: false,
    });
  }

  toggleVisible() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  render() {
    return (
      <div className="to-wrap__container">

        {this.state.isVisible
          ?
            <div className="box" />
          :
            null
        }

        <button onClick={this.toggleVisible} >
          Toggle Box
        </button>

      </div>
    );
  }
}

export default wrapWithClickout(ToWrap);
```

## Details
- uses higher order functions (does not use mixins)
- uses callback refs (does not use `ReactDOM.findDOMNode)` (which will eventually be deprecated (see [here](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md) and [here](https://github.com/yannickcr/eslint-plugin-react/issues/678#issue-165177220)))



## Tests
With Yarn:
```
yarn run test
```

With NPM:
```
npm run test
```


## Credits
Initially a fork from [react-click-outside](https://github.com/kentor/react-click-outside).
Thanks to [Dan Abramov](https://github.com/gaearon) for the solution of [using callback refs](https://github.com/yannickcr/eslint-plugin-react/issues/678#issuecomment-232293175).

## Licence

[Apache-2.0](LICENSE.txt)