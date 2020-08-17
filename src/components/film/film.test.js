import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const film = {
  id: 1,
  name: `Fantastic Beasts`,
  previewImage: `img/bohemian-rhapsody.jpg`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`Render Film`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Film
            film={film}
            onFilmMouseOver={()=>{}}
            onFilmMouseLeave={()=>{}}
            index={1}
            isActive={false}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
