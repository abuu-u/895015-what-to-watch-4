import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withFilmPlayer from "./with-film-player.js";

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
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
