import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withActiveFilm from "./with-active-film.js";

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

const MockComponentWrapped = withActiveFilm(MockComponent);

it(`withActiveFilm is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={{}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
