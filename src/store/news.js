import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    news: [],
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
    SET_NEWS(state, data) {
      state.news = data;
    }
  },
  actions: {
    getAllNews({ commit }) {
      commit('LOADING');
      return api.news
        .getAllNews()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_NEWS', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    getDetailNews({ commit }, params) {
      commit('LOADING');
      return api.news
        .getDetailNews(params)
        .then(({ data }) => {
          commit('LOADED');
          // commit('SET_ORGANIZATION', data.data)
          return data.data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    createNews({commit}, data) {
      commit('LOADING');
      return api.news
        .createNews(data)
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
    },
    editNews({commit}, data) {
      commit('LOADING');
      return api.news
        .editNews(data)
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
    },
    deleteNews({commit}, data) {
      commit('LOADING');
      return api.news
        .deleteNews(data)
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
    news: state => state.news,
    viewing: state => state.viewing
  }
};
