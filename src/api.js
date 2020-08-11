import axios from "axios";

const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized, onBadRequest) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }


    if (response.status === Error.BAD_REQUEST) {
      onBadRequest();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
