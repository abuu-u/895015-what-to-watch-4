import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {generateFilms} from "./mock/film";

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const films = generateFilms(10);

ReactDOM.render(
    <App
      promoFilm={PromoFilm}
      films={films}
    />,
    document.getElementById(`root`)
);
