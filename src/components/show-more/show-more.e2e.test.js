import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMore from "./show-more.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onShowMoreClick = jest.fn();

  const showMoreComponent = shallow(
      <ShowMore
        onShowMoreClick={onShowMoreClick}
      />
  );

  const button = showMoreComponent.find(`.catalog__button`);

  button.simulate(`click`);

  expect(onShowMoreClick).toHaveBeenCalledTimes(1);
});
