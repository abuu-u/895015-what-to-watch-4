import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const films = [
  {
    id: 1,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
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
  },
  {
    id: 2,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
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
  },
  {
    id: 3,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
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
  },

];

const comments = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
  {
    id: 2,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  }
];

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.FILM]: {
      activeGenre: `Comedy`,
      activeFilm: null,
      playingFilm: null,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
            filmsByGenre={films}
            comments={comments}
            promoFilm={PromoFilm}
            activeGenre={`Comedy`}
            activeFilm={null}
            playingFilm={null}
            showingFilmsCount={8}
            onGenreClick={() => {}}
            onShowMoreClick={() => {}}
            onFilmClick={() => {}}
            onFilmPlayClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render ActiveFilm`, () => {
  const store = mockStore({
    [NameSpace.FILM]: {
      activeGenre: `Comedy`,
      activeFilm: films[0],
      playingFilm: null,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
            filmsByGenre={films}
            comments={comments}
            promoFilm={PromoFilm}
            activeGenre={`Comedy`}
            activeFilm={films[0]}
            playingFilm={null}
            showingFilmsCount={8}
            onGenreClick={() => {}}
            onShowMoreClick={() => {}}
            onFilmClick={() => {}}
            onFilmPlayClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render PlayingFilm`, () => {
  const store = mockStore({
    [NameSpace.FILM]: {
      activeGenre: `Comedy`,
      activeFilm: null,
      playingFilm: films[0],
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
            filmsByGenre={films}
            comments={comments}
            promoFilm={PromoFilm}
            activeGenre={`Comedy`}
            activeFilm={null}
            playingFilm={films[0]}
            showingFilmsCount={8}
            onGenreClick={() => {}}
            onShowMoreClick={() => {}}
            onFilmClick={() => {}}
            onFilmPlayClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
