import * as React from 'react';

type Props = {
  text: string;
}
type State = {
  isVisible: boolean;
}
class ToWrapComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
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

export default ToWrapComponent;
