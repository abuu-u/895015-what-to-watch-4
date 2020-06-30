import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: `2014`,
};

ReactDOM.render(
    <App
      name={Settings.NAME}
      genre={Settings.GENRE}
      releaseDate={Settings.RELEASE_DATE}
    />,
    document.querySelector(`#root`)
);
