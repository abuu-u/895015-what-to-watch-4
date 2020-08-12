import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {filterFilmsByGenre} from '../../utils';

const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

const getFavoriteFilms = (state) => {
  return state[NameSpace.DATA].favoriteFilms;
};

const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

const getGenre = (state) => {
  return state[NameSpace.FILM].activeGenre;
};

const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

const getFilmsByGenre = createSelector(
    getGenre,
    getFilms,
    filterFilmsByGenre
);

const getFilmById = (state, id) => createSelector(
    getFilms,
    (films) => films.find((film) => film.id === id)
)(state);

export {
  getFilms,
  getFilmsByGenre,
  getPromoFilm,
  getComments,
  getFilmById,
  getFavoriteFilms,
};
