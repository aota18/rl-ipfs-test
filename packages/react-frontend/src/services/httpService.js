import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: '/rest/api',
  timeout: 500000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let user;
  if (Cookies.get('user')) {
    user = JSON.parse(Cookies.get('user'));
  }

  return {
    ...config,
    headers: {
      Authorization: user ? `Bearer ${user.token}` : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body, headers) => {
    if (headers) {
      instance.headers = headers;
    }
    return instance.post(url, body).then(responseBody);
  },
  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
