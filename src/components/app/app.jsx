import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = (props) => {
  const {promoFilm, films} = props;

  return (
    <Main
      promoFilm={promoFilm}
      films={films}
    />
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    NAME: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    RELEASE_DATE: PropTypes.number.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
