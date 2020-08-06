import {extend} from "./utils.js";
import {DEFAULT_GENRE, SHOWING_FILMS_COUNT} from './const';

const initialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  showingFilmsCount: SHOWING_FILMS_COUNT.onStart,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`,
  INCREMENT_SHOWING_FILMS_COUNT: `INCREMENT_SHOWING_FILMS_COUNT`,
  RESET_SHOWING_FILMS_COUNT: `RESET_SHOWING_FILMS_COUNT`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload: films,
  }),
  incrementShowingFilmsCount: () => ({
    type: ActionType.INCREMENT_SHOWING_FILMS_COUNT,
    payload: SHOWING_FILMS_COUNT.byButton,
  }),
  resetShowingFilmsCount: () => ({
    type: ActionType.RESET_SHOWING_FILMS_COUNT,
    payload: SHOWING_FILMS_COUNT.onStart,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionType.SET_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.INCREMENT_SHOWING_FILMS_COUNT:
      return extend(state, {
        showingFilmsCount: state.showingFilmsCount + action.payload,
      });
    case ActionType.RESET_SHOWING_FILMS_COUNT:
      return extend(state, {
        showingFilmsCount: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
