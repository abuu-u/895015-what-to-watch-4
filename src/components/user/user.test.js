import React from "react";
import renderer from "react-test-renderer";
import User from "./user.jsx";

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render User`, () => {
  const tree = renderer
    .create(
        <User
          authInfo={authInfo}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
