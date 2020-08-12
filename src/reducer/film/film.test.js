import {reducer, ActionType, ActionCreator} from "./film.js";
import {extend} from '../../utils';

const initialState = {
  activeGenre: `All genres`,
  showingFilmsCount: 8,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should set active genre`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_GENRE,
    payload: `Comedy`,
  })).toEqual(extend(initialState, {
    activeGenre: `Comedy`,
  }));
});

it(`Reducer should increment showing films count`, () => {
  expect(reducer(initialState, {
    type: ActionType.INCREMENT_SHOWING_FILMS_COUNT,
    payload: 8,
  })).toEqual(extend(initialState, {
    showingFilmsCount: 16,
  }));
});

it(`Reducer should reset showing films count`, () => {
  expect(reducer(extend(initialState, {
    showingFilmsCount: 16,
  }), {
    type: ActionType.RESET_SHOWING_FILMS_COUNT,
    payload: 8,
  })).toEqual(extend(initialState, {
    showingFilmsCount: 8,
  }));
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting active genre returns correct action`, () => {
    expect(ActionCreator.setGenre(`Comedy`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    });
  });

  it(`Action creator for incrementing showing films count returns correct action`, () => {
    expect(ActionCreator.incrementShowingFilmsCount()).toEqual({
      type: ActionType.INCREMENT_SHOWING_FILMS_COUNT,
      payload: 8,
    });
  });

  it(`Action creator for resettins showing films count returns correct action`, () => {
    expect(ActionCreator.resetShowingFilmsCount()).toEqual({
      type: ActionType.RESET_SHOWING_FILMS_COUNT,
      payload: 8,
    });
  });
});
