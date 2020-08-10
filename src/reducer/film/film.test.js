import {reducer, ActionType, ActionCreator} from "./film.js";
import {extend} from '../../utils';

const mockFilms = [
  {
    id: 0,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://some-link`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    scoresCount: 240,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    runTime: 99,
    activeGenre: `Comedy`,
    released: 2014,
    isFavorite: false
  },
  {
    id: 1,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://some-link`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    scoresCount: 240,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    runTime: 99,
    genre: `Comedy`,
    released: 2014,
    isFavorite: false
  }
];

const initialState = {
  activeGenre: `All genres`,
  activeFilm: null,
  showingFilmsCount: 8,
  playingFilm: null,
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

it(`Reducer should set active film`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_ACTIVE_FILM,
    payload: mockFilms[0],
  })).toEqual(extend(initialState, {
    activeFilm: mockFilms[0],
  }));
});

it(`Reducer should set playing filn`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_PLAYING_FILM,
    payload: mockFilms[0],
  })).toEqual(extend(initialState, {
    playingFilm: mockFilms[0],
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

  it(`Action creator for setting active film returns correct action`, () => {
    expect(ActionCreator.setActiveFilm(mockFilms[0])).toEqual({
      type: ActionType.SET_ACTIVE_FILM,
      payload: mockFilms[0],
    });
  });

  it(`Action creator for setting playing film returns correct action`, () => {
    expect(ActionCreator.setPlayingFilm(mockFilms[0])).toEqual({
      type: ActionType.SET_PLAYING_FILM,
      payload: mockFilms[0],
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
