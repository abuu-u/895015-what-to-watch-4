import {extend} from "../../utils.js";
import {filmAdapter} from '../../adapter/film';
import {getFilms} from './selectors';

const initialState = {
  films: [],
  promoFilm: {},
  comments: [],
  favoriteFilms: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });
  }

  return state;
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => response.data.map(filmAdapter))
      .then((films) => {
        dispatch(ActionCreator.loadFilms(films));
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => response.data.map(filmAdapter))
      .then((films) => {
        dispatch(ActionCreator.loadFavoriteFilms(films));
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => filmAdapter(response.data))
      .then((film) => {
        dispatch(ActionCreator.loadPromoFilm(film));
      });
  },
  loadComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
  submitComment: (comment, filmId) => (dispatch, getState, api) => {
    return api.post(`/comments/${filmId}`, comment)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
  addFilmToFavorites: (filmId, status, isFilmPromo) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/${status}`)
      .then((response) => filmAdapter(response.data))
      .then((film) => {
        const films = getFilms(getState());
        const index = films.findIndex((it) => it.id === film.id);
        const newFilms = [
          ...films.slice(0, index),
          film,
          ...films.slice(index + 1)
        ];

        dispatch(ActionCreator.loadFavoriteFilms(newFilms));

        dispatch(ActionCreator.loadFilms(newFilms));

        if (isFilmPromo) {
          dispatch(ActionCreator.loadPromoFilm(film));
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
