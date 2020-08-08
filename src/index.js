import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import {ActionCreator} from "./reducer.js";
import {generateFilms} from './mock/film';

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const store = createStore(reducer);
store.dispatch(ActionCreator.setFilms(generateFilms(10)));

ReactDOM.render(
    <Provider store={store}>
      <App
        promoFilm={PromoFilm}
      />
    </Provider>,
    document.getElementById(`root`)
);
