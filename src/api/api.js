import axios from 'axios';
import token from '../utils/token';
import achievement from './achievement';
import recruitment from './recruitment';
import organization from './organization';

export const ApiGeneral = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

export const setAccessToken = token => {
  axios.defaults.headers.common['rplgdcToken'] = token;
};

if (token.exists()) {
  setAccessToken(token.get());
}

export default {
  achievement,
  organization,
  recruitment
};