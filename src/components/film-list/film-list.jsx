import React from "react";
import PropTypes from "prop-types";
import Film from '../film/film.jsx';

class FilmList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timerId = null;

    this.state = {
      activeFilmId: null,
    };

    this.handleFilmMouseOver = this.handleFilmMouseOver.bind(this);
    this.handleFilmMouseLeave = this.handleFilmMouseLeave.bind(this);
  }

  render() {
    const {films, onFilmClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => <Film
          film={film}
          onFilmClick={onFilmClick}
          onFilmMouseOver={this.handleFilmMouseOver}
          onFilmMouseLeave={this.handleFilmMouseLeave}
          key={film + index}
          index={index}
          isActive={this.state.activeFilmId === film.id}
        />)}
      </div>
    );
  }

  handleFilmMouseOver(evt) {
    const id = evt.currentTarget.id;

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = setTimeout(() => {
      this.setState({activeFilmId: parseInt(id, 10)});
    }, 1000);
  }

  handleFilmMouseLeave() {
    clearTimeout(this.timerId);
    this.setState({activeFilmId: null});
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  onFilmClick: PropTypes.func.isRequired,
};

export default FilmList;
