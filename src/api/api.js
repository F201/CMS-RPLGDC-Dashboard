import axios from 'axios';
import token from '../utils/token';
import achievement from './achievement'; 

const TIMEOUT = 12000;

export const ApiGeneral = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: TIMEOUT
});

export const setAccessToken = token => {
  axios.defaults.headers.common['rplgdcToken'] = token;
};

if (token.exists()) {
  setAccessToken(token.get());
}

export default {
  achievement
};