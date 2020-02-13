import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    divisionTools: [],
    viewing: false,
    addingTool: false
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
    ADDING_TOOL(state) {
      state.addingTool = true;
    },
    ADDED_TOOL(state) {
      state.addingTool = false;
    },
    SET_DIVISION_TOOLS(state, data) {
      state.divisionTools = data;
    }
  },
  actions: {
    getDivisionTools({ commit }, params) {
      commit('LOADING');
      return api.divisionTool
        .getDivisionTools(params)
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_PRODUCT_TOOLS', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    addDivisionTool({ commit }, data) {
      commit('LOADING');
      return api.divisionTool
        .addDivisionTool(data)
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
    deleteDivisionTool({commit}, params) {
      commit('LOADING');
      return api.divisionTool
        .deleteDivisionTool(params)
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
    divisionTools: state => state.divisionTools,
    addingTool: state => state.addingTool,
    viewing: state => state.viewing
  }
};
