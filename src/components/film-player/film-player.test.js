import React from "react";
import renderer from "react-test-renderer";
import FilmPlayer from "./film-player.jsx";

const film = {
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://some-link`,
};

it(`Render FilmPlayer`, () => {
  const tree = renderer
    .create(<FilmPlayer
      film={film}
      isLoading={false}
      isPlaying={false}
      duration={100}
      progress={70}
      onPlayButtonClick={() => {}}
      onFullScreenButtonClick={() => {}}
      onMount={() => {}}
    >
      <video/>
    </FilmPlayer>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
