import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from '../../const';

const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

const getGenre = (state) => {
  return state[NameSpace.FILM].activeGenre;
};

const getFilmsByGenre = createSelector(
    getFilms,
    getGenre,
    (films, genre) => {
      if (genre === DEFAULT_GENRE) {
        return films;
      }

      return films.filter((film) => film.genre === genre);
    }
);

export {getFilms, getFilmsByGenre, getPromoFilm};
