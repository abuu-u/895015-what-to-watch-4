
import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
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

it(`Checks that HOC's callback turn on and turn off video (play and pause)`, () => {
  const PlayerWrapped = withFilmPlayer(Player);
  const wrapper = mount(
      <PlayerWrapped
        film={film}
      />);

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);
  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  expect(wrapper.state().isPlaying).toEqual(false);

  wrapper.find(`button`).simulate(`click`);
  expect(wrapper.state().isPlaying).toEqual(true);

  wrapper.find(`button`).simulate(`click`);
  expect(wrapper.state().isPlaying).toEqual(false);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});
