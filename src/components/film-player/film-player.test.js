import React from "react";
import renderer from "react-test-renderer";
import {FilmPlayer} from "./film-player.jsx";

const film = {
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  genre: `Comedy`,
  released: 2014,
};

it(`Render FilmPlayer`, () => {
  const tree = renderer
    .create(<FilmPlayer
      film={film}
      isLoading={false}
      isPlaying={false}
      duration={100}
      progress={70}
      onPlayButtonClick={() => {}}
      onFullScreenButtonClick={() => {}}
      onExitButtonClick={() => {}}
    >
      <video/>
    </FilmPlayer>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
