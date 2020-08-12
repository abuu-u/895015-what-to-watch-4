import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`Render SignIn`, () => {
  const tree = renderer
    .create(<SignIn
      errorText={``}
      onLogin={() => {}}
    />, {
      createNodeMock() {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
