import React from "react";
import renderer from "react-test-renderer";
import Details from "./details.jsx";

const film = {
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  runTime: 99,
  genre: `Comedy`,
  released: 2014,
};

it(`Render Details`, () => {
  const tree = renderer
    .create(<Details
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
