import React from "react";
import renderer from "react-test-renderer";
import FilmPlayer from "./film-player.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const film = {
  id: 1,
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://some-link`,
};

it(`Render FilmPlayer`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FilmPlayer
            film={film}
            isLoading={false}
            isPlaying={false}
            duration={100}
            progress={70}
            onPlayButtonClick={() => {}}
            onFullScreenButtonClick={() => {}}
          >
            <video />
          </FilmPlayer>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
