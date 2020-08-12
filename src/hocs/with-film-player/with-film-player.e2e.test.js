
import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmPlayer from "./with-film-player.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const authInfo = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};


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
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo,
    },
  });

  const PlayerWrapped = withFilmPlayer(Player);
  const wrapper = mount(
      <Provider store={store}>
        <PlayerWrapped
          isPlaying={false}
          onPlayButtonClick={() => {}}
          onMount={() => {}}
          film={film}
        />ilm={film}
      </Provider>, {
        createNodeMock() {
          return {};
        }
      });

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);
  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);
  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});
