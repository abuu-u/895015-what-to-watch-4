import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withSubmit from "./with-submit.js";

const COMMENT = {
  min: 50,
  max: 400,
};

const RATING = {
  min: 1,
  max: 5,
};

const generateComment = (length) => {
  return new Array(length).fill(`1`).join(``);
};

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withSubmit(MockComponent);

it(`Should change isSubmitDisabled`, () => {
  const wrapper = shallow(<MockComponentWrapped
    onSubmit={() => {}}
  />);

  expect(wrapper.props().isSubmitDisabled).toEqual(true);

  wrapper.props().onChange({
    comment: generateComment(COMMENT.min),
    rating: RATING.min,
  });
  expect(wrapper.props().isSubmitDisabled).toEqual(false);

  wrapper.props().onChange({
    comment: generateComment(COMMENT.max),
    rating: RATING.max,
  });
  expect(wrapper.props().isSubmitDisabled).toEqual(false);

  wrapper.props().onChange({
    comment: generateComment(COMMENT.min - 10),
    rating: RATING.min,
  });
  expect(wrapper.props().isSubmitDisabled).toEqual(true);

  wrapper.props().onChange({
    comment: generateComment(COMMENT.max),
    rating: RATING.max + 10,
  });
  expect(wrapper.props().isSubmitDisabled).toEqual(true);
});
