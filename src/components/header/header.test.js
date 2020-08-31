import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Render Header`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            isUserPage={false}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render user page Header`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            isUserPage={true}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
