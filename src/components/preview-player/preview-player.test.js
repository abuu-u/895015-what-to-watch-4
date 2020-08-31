import React from "react";
import renderer from "react-test-renderer";
import PreviewPlayer from "./preview-player.jsx";

const previewVideoLink = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;

it(`Render PreviewPlayer`, () => {
  const tree = renderer
    .create(<PreviewPlayer
      previewVideoLink={previewVideoLink}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
