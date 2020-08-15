
import React from "react";
import PropTypes from "prop-types";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmPlayer from "./with-film-player.js";

const film = {
  previewImage: `img/bohemian-rhapsody.jpg`,
  videoLink: `https://some-link`,
};

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      {children}
      <button onClick={onPlayButtonClick} />
    </div>
  );
};

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

it(`Checks that HOC's callback turn on video (play)`, () => {
  let isPlaying = false;

  const onPlayButtonClick = jest.fn(() => {
    isPlaying = !isPlaying;
    wrapper.setProps({isPlaying});
  });

  const PlayerWrapped = withFilmPlayer(Player);
  const wrapper = shallow(
      <PlayerWrapped
        film={film}
        isPlaying={isPlaying}
        onPlayButtonClick={onPlayButtonClick}
      />, {
        createNodeMock() {
          return {};
        }
      });

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  expect(wrapper.props().isPlaying).toEqual(true);
});

it(`Checks that HOC's callback turn off video (pause)`, () => {
  let isPlaying = true;

  const onPlayButtonClick = jest.fn(() => {
    isPlaying = !isPlaying;
    wrapper.setProps({isPlaying});
  });

  const PlayerWrapped = withFilmPlayer(Player);
  const wrapper = shallow(
      <PlayerWrapped
        film={film}
        isPlaying={isPlaying}
        onPlayButtonClick={onPlayButtonClick}
      />, {
        createNodeMock() {
          return {};
        }
      });

  window.HTMLMediaElement.prototype.pause = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  expect(wrapper.props().isPlaying).toEqual(false);
});
