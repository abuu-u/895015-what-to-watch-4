import {reducer, ActionType, ActionCreator} from "./data.js";
import {extend} from './utils';

const promoFilm = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

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
  films: [],
  promoFilm: {},
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should set films`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_FILMS,
    payload: mockFilms,
  })).toEqual(extend(initialState, {
    films: mockFilms,
  }));
  expect(reducer(initialState, {
    type: ActionType.SET_PROMO_FILM,
    payload: promoFilm,
  })).toEqual(extend(initialState, {
    promoFilm,
  }));
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting films returns correct action`, () => {
    expect(ActionCreator.setFilms(mockFilms)).toEqual({
      type: ActionType.SET_FILMS,
      payload: mockFilms,
    });
  });

  it(`Action creator for setting promo film returns correct action`, () => {
    expect(ActionCreator.setPromoFilm(promoFilm)).toEqual({
      type: ActionType.SET_PROMO_FILM,
      payload: promoFilm,
    });
  });
});
