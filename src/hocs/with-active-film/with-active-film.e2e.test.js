import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveFilm from "./with-active-film.js";

configure({adapter: new Adapter()});

jest.useFakeTimers();

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveFilm(MockComponent);

it(`Should wait 1 second before  change activeFilmId`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  wrapper.props().onFilmMouseOver(1);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

it(`Should change activeFilmId`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  expect(wrapper.props().activeFilmId).toEqual(-1);

  wrapper.props().onFilmMouseOver(1);
  jest.runAllTimers();
  expect(wrapper.props().activeFilmId).toEqual(1);

  wrapper.props().onFilmMouseOver(3);
  jest.runAllTimers();
  expect(wrapper.props().activeFilmId).toEqual(3);

  wrapper.props().onFilmMouseLeave();
  jest.runAllTimers();
  expect(wrapper.props().activeFilmId).toEqual(-1);
});
