import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);


const activeFilm = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
};

const authInfo = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

it(`Render AddReview`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <AddReview
            activeFilm={activeFilm}
            isSubmitDisabled={false}
            onSubmit={() => {}}
            onChange={() => {}}
          />
        </Provider>, {
          createNodeMock() {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
