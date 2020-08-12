import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FilmPlayer} from "./film-player.jsx";

const film = {
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://some-link`,
};

configure({adapter: new Adapter()});

it(`Click by Play button calls callback`, () => {
  const handlePlayButtonClick = jest.fn();
  const handleFullScreenButtonClick = jest.fn();
  const handleExitButtonClick = jest.fn();
  const handleMount = jest.fn();

  const wrapper = shallow(<FilmPlayer
    film={film}
    isLoading={false}
    isPlaying={false}
    duration={100}
    progress={70}
    onPlayButtonClick={handlePlayButtonClick}
    onFullScreenButtonClick={handleFullScreenButtonClick}
    onExitButtonClick={handleExitButtonClick}
    onMount={handleMount}
  >
    <audio />
  </FilmPlayer>);

  wrapper.find(`.player__play`).simulate(`click`);
  wrapper.find(`.player__full-screen`).simulate(`click`);
  wrapper.find(`.player__exit`).simulate(`click`);
  wrapper.instance().componentDidMount();

  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
  expect(handleFullScreenButtonClick).toHaveBeenCalledTimes(1);
  expect(handleExitButtonClick).toHaveBeenCalledTimes(1);
  expect(handleMount).toHaveBeenCalledTimes(1);
});
