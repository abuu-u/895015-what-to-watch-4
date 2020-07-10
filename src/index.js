import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const films = [
  {
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
  {
    name: `Bohemian Rhapsody`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
  {
    name: `Macbeth`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
];

ReactDOM.render(
    <App
      promoFilm={PromoFilm}
      films={films}
    />,
    document.getElementById(`root`)
);
