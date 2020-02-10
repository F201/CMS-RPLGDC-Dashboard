import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    recruitments: [],
    viewing: false
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
    SET_RECRUITMENT(state, data) {
      state.recruitments = data;
    }
  },
  actions: {
    getAllRecruitment({ commit }) {
      commit('LOADING');
      return api.recruitment
        .getAllRecruitment()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_RECRUITMENT', data.data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
  },
  getters: {
    loading: state => state.loading,
    recruitments: state => state.recruitments,
    viewing: state => state.viewing
  }
};
