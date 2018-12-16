import * as React from 'react';

type Options = {
  dataId?: string;
  wrapperStyle?: string;
}
type ToWrap = {
  handleClickout?: (e: Event) => void;
}
export const withClickout = <P extends object>(ToWrap: React.ComponentType<P> & ToWrap, opts: Options = {}): React.ComponentType<P> => {
  class Clickout extends React.Component<P> {
    containerDiv: HTMLDivElement | null;
    toWrapComponent: React.Component & ToWrap;

    componentDidMount() {
      document.addEventListener('click', this.handler, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handler, true);
    }

    // EventListener expects an Event
    // React.SyntheticEvent<HTMLElement> is incompatible
    handler: EventListener = (e: Event) => {
      const containerDiv = this.containerDiv;

      const toWrapComponent = this.toWrapComponent;

      const target = e.target as HTMLElement;

      if ((!containerDiv || !containerDiv.contains(target)) &&
        typeof toWrapComponent.handleClickout === 'function'
      ) {
        const data = target.dataset && target.dataset.reactClickout;
        if (data === 'exclude') return;

        toWrapComponent.handleClickout(e);
      }
    }

    render() {
      const { wrapperStyle = '', dataId = '' } = opts;
      const containerClassName = ['rc__wrapper', wrapperStyle].join('');
      const divProps = dataId ? { 'data-id': dataId, } : {};
      return (
        <div
          ref={(r) => { this.containerDiv = r; }}
          className={containerClassName}
          {...divProps}
        >
          <ToWrap
            {...this.props}
            ref={(c: React.Component) => { this.toWrapComponent = c; }}
          />
        </div>
      );
    }
  }
  return Clickout;
};

export default withClickout;

