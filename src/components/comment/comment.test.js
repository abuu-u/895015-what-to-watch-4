import React from "react";
import renderer from "react-test-renderer";
import Comment from "./comment.jsx";

const comment = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`,
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`,
};

it(`Render Comment`, () => {
  const tree = renderer
    .create(<Comment
      comment={comment}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
