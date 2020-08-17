import React from "react";
import renderer from "react-test-renderer";
import User from "./user.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render User`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <User
            authInfo={authInfo}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
