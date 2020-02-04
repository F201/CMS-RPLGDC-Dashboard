import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    achievements: [],
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
    SET_ACHIEVEMENT(state, data) {
      state.achievements = data;
    }
  },
  actions: {
    getAllAchievement({ commit }) {
      commit('LOADING');
      return api.achievement
        .getAllAchievement()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ACHIEVEMENT', data.data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
  },
  getters: {
    loading: state => state.loading,
    achievements: state => state.achievements,
    viewing: state => state.viewing
  }
};
