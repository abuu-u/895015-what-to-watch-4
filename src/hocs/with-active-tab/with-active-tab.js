import React, {PureComponent} from 'react';
import {TAB} from '../../const';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TAB.overview,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    render() {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        activeTab={activeTab}
        onClick={this._handleClick}
      />;
    }

    _handleClick(id) {
      this.setState({activeTab: id});
    }
  }

  WithActiveTab.propTypes = {};

  return WithActiveTab;
};

export default withActiveTab;
