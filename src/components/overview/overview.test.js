import React from "react";
import renderer from "react-test-renderer";
import Overview from "./overview.jsx";

const film = {
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
};

it(`Render Overview`, () => {
  const tree = renderer
    .create(<Overview
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
