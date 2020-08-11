import {extend} from "../../utils.js";
import {filmAdapter} from '../../adapter/film';

const initialState = {
  films: [],
  promoFilm: {},
  comments: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
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
};

export {reducer, ActionType, ActionCreator, Operation};
