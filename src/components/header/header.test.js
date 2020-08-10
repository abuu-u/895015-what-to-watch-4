import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render unauthorized Header`, () => {
  const tree = renderer
    .create(<Header
      authorizationStatus={`NO_AUTH`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render authorized Header`, () => {
  const tree = renderer
    .create(<Header
      authorizationStatus={`AUTH`}
      authInfo={authInfo}
    />, {
      createNodeMock() {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
