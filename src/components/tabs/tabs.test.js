import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {TABS} from '../../const';

const film = {
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
};

const onClick = () => {};

it(`Render Tabs`, () => {
  const tree = renderer
    .create(<Tabs
      film={film}
      activeTab={TABS[0]}
      onClick={onClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
