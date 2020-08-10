import React from "react";
import PropTypes from "prop-types";
import {DEFAULT_GENRE} from '../../const';

const MAX_GENRES_COUNT = 9;

const GenresFilter = (props) => {
  const {
    activeGenre,
    films,
    onGenreClick,
  } = props;

  const uniqueGenres = [...new Set(films.map((film) => film.genre))].slice(0, MAX_GENRES_COUNT);

  return (
    <ul className="catalog__genres-list">
      <li
        className={`catalog__genres-item catalog__genres-item${DEFAULT_GENRE === activeGenre ? `--active` : ``}`}
      >
        <a
          href="#"
          className="catalog__genres-link"
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(evt.currentTarget.dataset.id);
          }}
          data-id={DEFAULT_GENRE}
        >{DEFAULT_GENRE}</a>
      </li>
      {uniqueGenres.map((genre, index) => {
        return (
          <li
            className={`catalog__genres-item catalog__genres-item${genre === activeGenre ? `--active` : ``}`}
            key={index + genre}
          >
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                onGenreClick(evt.currentTarget.dataset.id);
              }}
              data-id={genre}
            >{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresFilter.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
  })).isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenresFilter;
