import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    actDivision: [],
    viewing: false,
    addingDivision: false
  },
  mutations: {
    LOADING(state) {
      state.loading = true;
    },
    LOADED(state) {
      state.loading = false;
    },
    VIEWING(state) {
      state.viewing = true;
    },
    VIEWED(state) {
      state.viewing = false;
    },
    ADDING_DIVISION(state) {
      state.addingDivision = true;
    },
    ADDED_DIVISION(state) {
      state.addingDivision = false;
    },
    SET_ACTIVITIES_DIVISION(state, data) {
      state.actDivision = data;
    }
  },
  actions: {
    getActDivision({ commit }, params) {
      commit('LOADING');
      return api.actDivision
        .getActDivision(params)
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ACTIVITIES_DIVISION', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    addActDivision({ commit }, data) {
      commit('LOADING');
      return api.actDivision
        .addActDivision(data)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    deleteActDivision({commit}, params) {
      commit('LOADING');
      return api.actDivision
        .deleteActDivision(params)
        .then(({data}) => {
          commit('LOADED');
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err, err.response)
          // return err.response.data;
        });
    }
  },
  getters: {
    loading: state => state.loading,
    actDivision: state => state.actDivision,
    addingDivision: state => state.addingDivision,
    viewing: state => state.viewing
  }
};
