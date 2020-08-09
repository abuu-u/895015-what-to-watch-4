import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./data.js";
import {extend} from './utils';

const api = createAPI(() => {});

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

it(`Reducer should update films by load films`, () => {
  expect(reducer(initialState, {
    type: ActionType.LOAD_FILMS,
    payload: mockFilms,
  })).toEqual(extend(initialState, {
    films: mockFilms,
  }));
  expect(reducer(initialState, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: promoFilm,
  })).toEqual(extend(initialState, {
    promoFilm,
  }));
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading films returns correct action`, () => {
    expect(ActionCreator.loadFilms(mockFilms)).toEqual({
      type: ActionType.SET_FILMS,
      payload: mockFilms,
    });
  });

  it(`Action creator for loading promo film returns correct action`, () => {
    expect(ActionCreator.loadPromoFilm(promoFilm)).toEqual({
      type: ActionType.SET_PROMO_FILM,
      payload: promoFilm,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /film/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/film/promo`)
      .reply(200, [{fake: true}]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: [{fake: true}],
        });
      });
  });
});
