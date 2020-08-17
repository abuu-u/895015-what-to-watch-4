import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";
import history from "../../history.js";
import SignIn from "./sign-in.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onSubmit = jest.fn(() => Promise.resolve());

  const filmComponent = mount(
      <Router
        history={history}
      >
        <SignIn
          errorText={``}
          onSubmit={onSubmit}
        />
      </Router>
  );

  const form = filmComponent.find(`.sign-in__form`);

  form.simulate(`submit`, {preventDefault() {}});

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
