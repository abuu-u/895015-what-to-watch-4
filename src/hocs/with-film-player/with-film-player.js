import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilmById} from "../../reducer/data/selectors";

const PLAYER_CLASS = `player__video`;

const withFilmPlayer = (Component) => {
  class WithFilmPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isLoading: true,
        isPlaying: false,
        progress: 0,
        duration: 0,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const {film} = this.props;
      const video = this._videoRef.current;

      video.className = PLAYER_CLASS;
      video.poster = film.previewImage;
      video.src = film.videoLink;

      video.oncanplaythrough = () => this.setState({
        isLoading: false,
        duration: video.duration,
      });

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.currentTime),
      });
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.className = ``;
      video.poster = ``;
      video.src = ``;
    }

    render() {
      const {
        isLoading,
        isPlaying,
        progress,
        duration,
      } = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayButtonClick={this._handlePlayButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
        >
          <video
            ref={this._videoRef}
          />
        </Component>
      );
    }

    _handlePlayButtonClick() {
      this.setState((state) => {
        return {isPlaying: !state.isPlaying};
      });
    }

    _handleFullScreenButtonClick() {
      this._videoRef.current.requestFullscreen();
    }
  }

  WithFilmPlayer.propTypes = {
    film: PropTypes.shape({
      previewImage: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
    }).isRequired,
  };

  const mapStateToProps = (state, props) => ({
    film: getFilmById(state, props.id),
  });

  return connect(mapStateToProps)(WithFilmPlayer);

};

export default withFilmPlayer;
