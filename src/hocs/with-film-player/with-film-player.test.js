import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withFilmPlayer from "./with-film-player.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const authInfo = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

const film = {
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://some-link`,
};

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withFilmPlayer(MockComponent);

it(`withFilmPlayer is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo,
    },
  });

  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        film={film}
      />
    </Provider>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
