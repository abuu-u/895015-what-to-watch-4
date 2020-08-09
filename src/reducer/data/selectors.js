import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {filterFilmsByGenre} from '../../utils';

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
    getGenre,    getFilms,
    filterFilmsByGenre
);

export {getFilms, getFilmsByGenre, getPromoFilm};
