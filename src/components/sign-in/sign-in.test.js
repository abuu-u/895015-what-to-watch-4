import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Render SignIn`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <SignIn
            errorText={``}
            onLogin={() => {}}
          />
        </Router>, {
          createNodeMock() {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
