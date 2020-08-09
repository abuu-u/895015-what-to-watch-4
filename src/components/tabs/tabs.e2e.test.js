import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onClick = jest.fn();
  const evt = {
    preventDefault() {},
    currentTarget: {dataset: {id: 0}},
  };

  const tabsComponent = shallow(
      <Tabs
        film={film}
        onClick={onClick}
        activeTab={TABS[0]}
      />
  );

  const links = tabsComponent.find(`.movie-nav__link`);

  links.first().simulate(`click`, evt);

  expect(onClick).toHaveBeenCalledTimes(1);
});
