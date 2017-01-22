import React from 'react';
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import wrapWithClickout from '../../src';
import ToWrap from '../fixtures/ToWrap';

const text = 'Magic';

const simulateClick = (node) => {
  const event = document.createEvent('Event');
  event.initEvent('click', true, true);
  node.dispatchEvent(event);
  return event;
};

describe('React Clickout', () => {
  it('should render a ToWrap test component', () => {
    const handleClickoutSpy = spy(ToWrap.prototype, 'handleClickout');
    const wrapper = shallow(
      <ToWrap
        text={text}
      />,
    );
    expect(handleClickoutSpy.callCount).to.equal(0);
    expect(wrapper.find('.to-wrap__container').length).to.equal(1);

    // button click handler calls handleClickout
    wrapper.find('button').simulate('click');
    expect(handleClickoutSpy.callCount).to.equal(1);

    handleClickoutSpy.restore();
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
        <div className="outside">OUTSIDE</div>
        <Wrapped
          text={text}
        />
      </div>
    );
    expect(handleClickoutSpy.callCount).to.equal(0);

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    ReactDOM.render(<Root />, mountNode);

    expect(document.querySelectorAll('.to-wrap__container').length).to.equal(1);

    // clicking ToWrap should not increment handleClickout count
    simulateClick(document.body.querySelector('.to-wrap__container'));
    simulateClick(document.body.querySelector('.to-wrap__text'));
    expect(handleClickoutSpy.callCount).to.equal(0);

    // clickout!
    simulateClick(document.body.querySelector('.outside'));
    expect(handleClickoutSpy.callCount).to.equal(1);

    ReactDOM.unmountComponentAtNode(mountNode);
    handleClickoutSpy.restore();
  });
});
