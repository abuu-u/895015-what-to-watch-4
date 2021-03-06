import React from "react";
import PropTypes from "prop-types";
import Film from '../film/film.jsx';

const FilmList = (props) => {
  const {
    films,
    activeFilmId,
    showingFilmsCount,
    onFilmMouseOver,
    onFilmMouseLeave,
  } = props;

  return (
    <div className="catalog__movies-list">
      {films.slice(0, showingFilmsCount).map((film, index) => <Film
        film={film}
        onFilmMouseOver={onFilmMouseOver}
        onFilmMouseLeave={onFilmMouseLeave}
        key={film + index}
        isActive={activeFilmId === film.id}
      />)}
    </div>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  activeFilmId: PropTypes.number.isRequired,
  showingFilmsCount: PropTypes.number.isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onFilmMouseLeave: PropTypes.func.isRequired,
};

export default FilmList;
