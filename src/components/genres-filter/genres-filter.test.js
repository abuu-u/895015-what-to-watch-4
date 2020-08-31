import React from "react";
import renderer from "react-test-renderer";
import GenresFilter from "./genres-filter.jsx";

const onGenreClick = () => {};

const films = [
  {
    genre: `Comedy`,
  },
  {
    genre: `Crime`,
  },
  {
    genre: `Documentary`,
  },
  {
    genre: `Drama`,
  },
  {
    genre: `Horror`,
  },
];

it(`Render GenresFilter`, () => {
  const tree = renderer
    .create(<GenresFilter
      activeGenre={`Comedy`}
      films={films}
      onGenreClick={onGenreClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
