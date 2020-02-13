import api, { setAccessToken } from '../api/api';
import token from '../utils/token';

export default {
  namespaced: true,
  state: {
    user: null,
    token: token.get(),
    isLogedIn: token.exists(),
    loading: false
  },
  mutations: {
    LOADING(state) {
      state.loading = true;
    },
    LOADED(state) {
      state.loading = false;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGEDIN(state, status) {
      state.isLogedIn = status;
    },
  },
  actions: {
    login({ commit }, credentials) {
      commit('LOADING');
      return api.auth
        .login(credentials)
        .then(({ data }) => {
          commit('LOADED');
          // if (!data.error) {
          // console.log(data)
          token.set(data.token);
          setAccessToken(data.token);
          commit('SET_LOGEDIN', true);
          // commit('SET_USER', data.data);
          commit('SET_TOKEN', data.token);
          return data;
          // } else {
          //   return data;
          // }
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
        });
    },
    logout({ commit }) {
      commit('SET_LOGEDIN', false);
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
      token.remove();
    },
    userDetail({ commit, state }) {
      setAccessToken(state.token);
      return api.auth
        .userDetail()
        .then(({ data }) => {
          if (data.status === 'error') return false
          commit('SET_USER', data.data);
          // commit('SET_USER_ROLE', data.data.result.role);
          return data;
        })
        .catch(() => {
          return false;
        });
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isLogedIn: state => state.isLogedIn,
    loading: state=> state.loading
  }
};
