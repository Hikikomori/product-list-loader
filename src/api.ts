import axios from 'axios';

const TIMEOUT = 5000;
const BASE_URL = `http://127.0.0.1:8080/api`;

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    throw err
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
