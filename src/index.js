import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import {ActionCreator} from "./reducer.js";
import {generateFilms} from './mock/film';

const promoFilm = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

store.dispatch(ActionCreator.setFilms(generateFilms(10)));
store.dispatch(ActionCreator.setPromoFilm(promoFilm));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
