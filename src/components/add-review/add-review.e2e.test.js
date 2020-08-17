import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
};

const authInfo = {
  avatarUrl: `img/1.png`
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onChange = jest.fn();
  const onFormSubmit = jest.fn();

  const filmComponent = mount(
      <Router
        history={history}
      >
        <AddReview
          film={film}
          errorText={``}
          authInfo={authInfo}
          isSubmitDisabled={false}
          isFormDisabled={false}
          onChange={onChange}
          onFormSubmit={onFormSubmit}
        />
      </Router>
  );

  const form = filmComponent.find(`.add-review__form`);

  form.simulate(`change`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onFormSubmit).toHaveBeenCalledTimes(1);
});
