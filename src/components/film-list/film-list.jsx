import React from "react";
import PropTypes from "prop-types";
import Film from '../film/film.jsx';

class FilmList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null,
    };

    this.onFilmHover = this.onFilmHover.bind(this);
  }

  render() {
    const {films, onFilmClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => <Film
          film={film}
          onFilmClick={onFilmClick}
          onFilmHover={this.onFilmHover}
          key={film + index}
          index={index}
        />)}
      </div>
    );
  }

  onFilmHover(evt) {
    this.setState({activeFilmId: evt.currentTarget.id});
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  })).isRequired,
  onFilmClick: PropTypes.func.isRequired,
};

export default FilmList;
