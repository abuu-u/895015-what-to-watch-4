import {extend} from "./utils.js";

const initialState = {
  films: [],
  promoFilm: {},
};

const ActionType = {
  SET_FILMS: `SET_FILMS`,
  SET_PROMO_FILM: `SET_PROMO_FILM`,
};

const ActionCreator = {
  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload: films,
  }),
  setPromoFilm: (film) => ({
    type: ActionType.SET_PROMO_FILM,
    payload: film,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.SET_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
