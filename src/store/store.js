import Vue from 'vue';
import Vuex from 'vuex';
import menu from '../utils/menu';
import achievement from './achievement';
import recruitment from './recruitment';
import organization from './organization';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    achievement,
    organization,
    recruitment
  },
  state: {
    sidebar: true,
    viewing: false,
    isPopUp: false,
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
    }
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
    listMenu: state => state.listMenu
  }
});
