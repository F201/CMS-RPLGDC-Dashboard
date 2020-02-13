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
    getAllRecruitment({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .getAllRecruitment(params)
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
    getDetailRecruitment({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .getDetailRecruitment(params)
        .then(({ data }) => {
          commit('LOADED');
          // commit('SET_RECRUITMENT', data.data)
          return data.data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    setLulusThp1({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .setLulusThp1(params)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    setLulusThp2({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .setLulusThp2(params)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    undoLulusThp1({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .undoLulusThp1(params)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    undoLulusThp2({ commit }, params) {
      commit('LOADING');
      return api.recruitment
        .undoLulusThp2(params)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    getSumThp1({ commit }) {
      commit('LOADING');
      return api.recruitment
        .getSumThp1()
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    },
    getSumThp2({ commit }) {
      commit('LOADING');
      return api.recruitment
        .getSumThp2()
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err.response)
          // return err.response.data;
        });
    }
  },
  getters: {
    loading: state => state.loading,
    recruitments: state => state.recruitments,
    viewing: state => state.viewing
  }
};
