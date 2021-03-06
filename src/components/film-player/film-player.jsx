import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

class FilmPlayer extends React.PureComponent {
  render() {
    const {
      film,
      isLoading,
      isPlaying,
      children,
      duration,
      onPlayButtonClick,
      onFullScreenButtonClick,
    } = this.props;

    const progress = duration ? this.props.progress / duration * 100 : 0;

    const getElapsedTime = () => {
      const seconds = duration - this.props.progress;
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      return `${hours}:${Math.floor(minutes % 60)}:${Math.floor(seconds % 60)}`;
    };

    return (
      <div className="player">
        {children}

        <Link
          to={`${AppRoute.FILMS}/${film.id}`}
          type="button"
          className="player__exit"
        >Exit</Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{getElapsedTime()}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              disabled={isLoading}
              onClick={onPlayButtonClick}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? `#pause` : `#play-s`}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={onFullScreenButtonClick}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FilmPlayer.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
};

export default FilmPlayer;
