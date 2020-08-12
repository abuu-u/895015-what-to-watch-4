import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from "./user.js";
import {extend} from '../../utils';

const api = createAPI(() => {});

const authInfoResponse = `{
  "id": 1,
  "email": "Oliver.conner@gmail.com",
  "name": "Oliver.conner",
  "avatar_url": "img/1.png"
}`;

const authInfo = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer(initialState, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual(extend(initialState, {
    authorizationStatus: AuthorizationStatus.AUTH,
  }));

  expect(reducer(extend(initialState, {
    authorizationStatus: AuthorizationStatus.AUTH,
  }), {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual(extend(initialState, {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }));

  expect(reducer(extend(initialState, {
    authorizationStatus: AuthorizationStatus.AUTH,
  }), {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual(extend(initialState, {
    authorizationStatus: AuthorizationStatus.AUTH,
  }));

  expect(reducer(initialState, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual(extend(initialState, {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }));
});

it(`Reducer should update authInfo by load authInfo`, () => {
  expect(reducer(initialState, {
    type: ActionType.LOAD_AUTH_INFO,
    payload: authInfo,
  })).toEqual(extend(initialState, {
    authInfo,
  }));
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
  it(`Action creator for loading auth info returns correct action`, () => {
    expect(ActionCreator.loadAuthInfo(authInfo)).toEqual({
      type: ActionType.LOAD_AUTH_INFO,
      payload: authInfo,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, authInfoResponse);

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: authInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({email: `email@gmail.com`, password: `123`});

    apiMock
      .onPost(`/login`)
      .reply(200, authInfoResponse);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: authInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });
});
