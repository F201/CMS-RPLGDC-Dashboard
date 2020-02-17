import Vue from 'vue';
import Vuex from 'vuex';
import menu from '../utils/menu';
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

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
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
  },
  state: {
    sidebar: true,
    viewing: false,
    isPopUp: false,
    imgView: false,
    listMenu: menu['default']
  },
  mutations: {
    set_sidebar(state, value) {
      state.sidebar = value;
    },
    viewing(state) {
      state.viewing = true;
    },
    viewed(state) {
      state.viewing = false;
    },
    POPING_UP(state) {
      state.isPopUp = true;
    },
    POPED_UP(state) {
      state.isPopUp = false;
    },
    IMG_VIEWING(state) {
      state.imgView = true;
    },
    IMG_VIEWED(state) {
      state.imgView = false;
    },
  },
  actions: {
    toggleSidebar({ state, commit }) {
      commit('set_sidebar', !state.sidebar);
    }
  },
  getters: {
    sidebar: state => state.sidebar,
    viewing: state => state.viewing,
    isPopUp: state => state.isPopUp,
    listMenu: state => state.listMenu,
    imgView: state => state.imgView
  }
});
