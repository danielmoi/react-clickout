import React, { PropTypes, Component } from 'react';

class ToWrap extends Component {
  static propTypes = {
    text: PropTypes.string,
  };
  static defaultProps = {
    text: '',
  };

  constructor() {
    super();
    this.handleClickout = this.handleClickout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isVisible: true,
    };
  }
  handleClickout() {
    this.setState({
      isVisible: false,
    });
  }

  handleClick() {
    this.handleClickout();
  }

  render() {
    const { text } = this.props;
    return (
      <div className="to-wrap__container">

        <div className="to-wrap__text">{text}</div>

        {this.state.isVisible
          ?
            <div className="box" />
          :
            null
        }

        <button onClick={this.handleClick}>
          Hide Box
        </button>

      </div>
    );
  }
}

export default ToWrap;
