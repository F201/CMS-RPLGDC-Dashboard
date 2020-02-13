import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    achievMember: [],
    viewing: false,
    addingMember: false
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
    ADDING_MEMBER(state) {
      state.addingMember = true;
    },
    ADDED_MEMBER(state) {
      state.addingMember = false;
    },
    SET_ACHIEVEMENT_MEMBER(state, data) {
      state.achievMember = data;
    }
  },
  actions: {
    getAchievMember({ commit }, params) {
      commit('LOADING');
      return api.productTool
        .getAchievMember(params)
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ACHIEVEMENT_MEMBER', data.data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    addAchievMember({ commit }, data) {
      commit('LOADING');
      return api.achievMember
        .addAchievMember(data)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    deleteAchievMember({commit}, params) {
      commit('LOADING');
      return api.achievMember
        .deleteAchievMember(params)
        .then(({data}) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err, err.response)
          // return err.response.data;
        });
    }
  },
  getters: {
    loading: state => state.loading,
    productTools: state => state.productTools,
    addingMember: state => state.addingMember,
    viewing: state => state.viewing
  }
};
