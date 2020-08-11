import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render unauthorized Header`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={`NO_AUTH`}
            authInfo={authInfo}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render authorized Header`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={`AUTH`}
            authInfo={authInfo}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
