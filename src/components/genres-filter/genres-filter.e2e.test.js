import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresFilter from "./genres-filter.jsx";

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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onGenreClick = jest.fn();
  const clickEvt = {
    preventDefault() {},
    currentTarget: {dataset: {id: 0}}
  };

  const filmComponent = shallow(
      <GenresFilter
        activeGenre={`Comedy`}
        films={films}
        onGenreClick={onGenreClick}
      />
  );

  const links = filmComponent.find(`.catalog__genres-link`);

  links.first().simulate(`click`, clickEvt);

  expect(onGenreClick).toHaveBeenCalledTimes(1);
});
