import React from "react";
import renderer from "react-test-renderer";
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

it(`Render AddReview`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <AddReview
            film={film}
            errorText={``}
            authInfo={authInfo}
            isSubmitDisabled={false}
            isFormDisabled={false}
            onChange={() => {}}
            onFormSubmit={() => {}}
          />
        </Router>, {
          createNodeMock() {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
