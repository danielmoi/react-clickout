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
    this.toggleBox = this.toggleBox.bind(this);
    this.hideBox = this.hideBox.bind(this);
    this.state = {
      isVisible: true,
    };
  }
  handleClickout() {
    this.hideBox();
  }

  toggleBox() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  hideBox() {
    this.setState({
      isVisible: false,
    });
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

        <button
          className="to-wrap__button to-wrap__button--toggle"
          onClick={this.toggleBox}
        >
          Toggle Box
        </button>

        <button
          className="to-wrap__button to-wrap__button--hide"
          onClick={this.handleClickout}
        >
          Hide Box
        </button>

      </div>
    );
  }
}

export default ToWrap;
