import React from 'react';
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import wrapWithClickout from '../../src';
import ToWrap from '../fixtures/ToWrap';

const text = 'Hello';

describe('React Clickout', () => {
  it('should render a ToWrap test component', () => {

  });

  it('should render a wrapped component', () => {
    const Wrapped = wrapWithClickout(ToWrap);

    const wrapper = mount(
      <Wrapped
        text={text}
      />,
    );
    expect(wrapper.find(ToWrap).length).to.equal(1);
    expect(wrapper.find('.to-wrap__container').length).to.equal(1);
    expect(wrapper.find('.to-wrap__text').length).to.equal(1);
    expect(wrapper.find('.to-wrap__text').text()).to.equal(text);
  });

  it('should handle a clickout', () => {
    const Wrapped = wrapWithClickout(ToWrap);
    const handleClickoutSpy = spy(ToWrap.prototype, 'handleClickout');

    const Root = () => (
      <div className="wrapper">
        <div className="something">SOMETHING</div>
        <Wrapped
          text={text}
        />
      </div>
    );

    function simulateClick(node) {
      const event = document.createEvent('Event');
      event.initEvent('click', true, true);
      node.dispatchEvent(event);
      return event;
    }

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    ReactDOM.render(<Root />, mountNode);

    expect(document.querySelectorAll('.to-wrap__container').length).to.equal(1);

    simulateClick(document.body.querySelector('.something'));

    expect(handleClickoutSpy.callCount).to.equal(1);

    ReactDOM.unmountComponentAtNode(mountNode);
    handleClickoutSpy.restore();
  });
});
