import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./data.js";
import {extend} from '../../utils';
import NameSpace from '../name-space';

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

const comments = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

const filmResponse = `{
  "id": 1,
  "name": "The Grand Budapest Hotel",
  "poster_image": "img/the-grand-budapest-hotel-poster.jpg",
  "preview_image": "img/the-grand-budapest-hotel.jpg",
  "background_image": "img/the-grand-budapest-hotel-bg.jpg",
  "background_color": "#ffffff",
  "video_link": "https://some-link",
  "preview_video_link": "https://some-link",
  "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
  "rating": 8.9,
  "scores_count": 240,
  "director": "Wes Andreson",
  "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
  "run_time": 99,
  "genre": "Comedy",
  "released": 2014,
  "is_favorite": false
}`;

const filmAdapted = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  previewImage: `img/the-grand-budapest-hotel.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  backgroundColor: `#ffffff`,
  videoLink: `https://some-link`,
  previewVideoLink: `https://some-link`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  runTime: 99,
  genre: `Comedy`,
  released: 2014,
  isFavorite: false
};

const userComment = {
  rating: 5,
  comment: `qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`,
};

const initialState = {
  films: [],
  promoFilm: {},
  comments: [],
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
});

it(`Reducer should update promoFilm by load promoFilm`, () => {
  expect(reducer(initialState, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: promoFilm,
  })).toEqual(extend(initialState, {
    promoFilm,
  }));
});

it(`Reducer should update comments by load comments`, () => {
  expect(reducer(initialState, {
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  })).toEqual(extend(initialState, {
    comments,
  }));
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading films returns correct action`, () => {
    expect(ActionCreator.loadFilms(mockFilms)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: mockFilms,
    });
  });

  it(`Action creator for loading promo film returns correct action`, () => {
    expect(ActionCreator.loadPromoFilm(promoFilm)).toEqual({
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm,
    });
  });

  it(`Action creator for loading comments returns correct action`, () => {
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
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
      .reply(200, `[${filmResponse}, ${filmResponse}]`);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [filmAdapted, filmAdapted],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, filmResponse);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: filmAdapted,
        });
      });
  });

  it(`Should make a correct API call to /comments/:film_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments/:film_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.submitComment(userComment, 1);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, userComment);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: userComment,
        });
      });
  });
});

it(`Should make a correct API call to /favorite/:film_id/:status`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const getState = () => ({[NameSpace.DATA]: {films: [filmAdapted]}});
  const addFilmToFavorites = Operation.addFilmToFavorites(filmAdapted.id, 1);

  apiMock
    .onPost(`/favorite/${filmAdapted.id}/1`)
    .reply(200, JSON.stringify(
        extend(JSON.parse(filmResponse), {
          [`is_favorite`]: true,
        })
    ));

  return addFilmToFavorites(dispatch, getState, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FILMS,
        payload: [
          extend(filmAdapted, {
            isFavorite: true,
          })
        ],
      });
    });
});

it(`Should make a correct API call to /favorite/:film_id/:status`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const addPromoFilmToFavorites = Operation.addPromoFilmToFavorites(filmAdapted.id, 1);

  apiMock
    .onPost(`/favorite/${filmAdapted.id}/1`)
    .reply(200, JSON.stringify(
        extend(JSON.parse(filmResponse), {
          [`is_favorite`]: true,
        })
    ));

  return addPromoFilmToFavorites(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_PROMO_FILM,
        payload:
          extend(filmAdapted, {
            isFavorite: true,
          }),
      });
    });
});
