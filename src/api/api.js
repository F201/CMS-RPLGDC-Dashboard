import axios from 'axios';
import token from '../utils/token';
import achievement from './achievement';
import achievMember from './achievMember';
import activities from './activities';
import actDivision from './actDivision';
import division from './division';
import divisionTool from './divisionTool';
import news from './news';
import recruitment from './recruitment';
import organization from './organization';
import tool from './tool';
import product from './product';
import productTool from './productTool';
import auth from './auth';

const TIMEOUT = 60000;
export const ApiNoAuth = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: TIMEOUT
});

export const ApiGeneral = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: TIMEOUT
});

export const setAccessToken = token => {
  // axios.defaults.headers.common['rplgdcToken'] = token;
  ApiGeneral.defaults.headers.common['Authorization'] = token;
};

if (token.exists()) {
  setAccessToken(token.get());
}

export default {
  auth,
  activities,
  actDivision,
  achievement,
  achievMember,
  division,
  divisionTool,
  news,
  organization,
  recruitment,
  tool,
  product,
  productTool
};