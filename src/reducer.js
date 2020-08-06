import {extend} from "./utils.js";
import {DEFAULT_GENRE} from './const';

const initialState = {
  genre: DEFAULT_GENRE,
  films: [],
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_FILMS:
      return extend(state, {
        films: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
