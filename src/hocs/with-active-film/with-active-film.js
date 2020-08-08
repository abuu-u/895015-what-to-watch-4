import React, {PureComponent} from 'react';

const PREVIEW_PLAY_DELAY = 1000;

const withActiveFilm = (Component) => {
  class WithActiveFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.timerId = null;

      this.state = {
        activeFilmId: -1,
      };

      this._handleFilmMouseOver = this._handleFilmMouseOver.bind(this);
      this._handleFilmMouseLeave = this._handleFilmMouseLeave.bind(this);
    }

    render() {
      const {activeFilmId} = this.state;

      return <Component
        {...this.props}
        activeFilmId={activeFilmId}
        onFilmMouseOver={this._handleFilmMouseOver}
        onFilmMouseLeave={this._handleFilmMouseLeave}
      />;
    }

    componentWillUnmount() {
      clearTimeout(this.timerId);
    }

    _handleFilmMouseOver(evt) {
      const id = parseInt(evt.currentTarget.id, 10);

      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      this.timerId = setTimeout(() => {
        this.setState({activeFilmId: id});
      }, PREVIEW_PLAY_DELAY);
    }

    _handleFilmMouseLeave() {
      clearTimeout(this.timerId);
      this.setState({activeFilmId: -1});
    }
  }

  WithActiveFilm.propTypes = {};

  return WithActiveFilm;
};

export default withActiveFilm;
