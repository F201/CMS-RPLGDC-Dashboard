import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    tools: [],
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
    SET_TOOL(state, data) {
      state.tools = data;
    }
  },
  actions: {
    getAllTool({ commit }) {
      commit('LOADING');
      return api.tool
        .getAllTool()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_TOOL', data.data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    getDetailTool({ commit }, params) {
      commit('LOADING');
      return api.tool
        .getDetailTool(params)
        .then(({ data }) => {
          commit('LOADED');
          // commit('SET_TOOL', data.data)
          return data.data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    createTool({commit}, data) {
      commit('LOADING');
      return api.tool
        .createTool(data)
        .then(({data}) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err, err.response)
          // return err.response.data;
        });
    },
    editTool({commit}, data) {
      commit('LOADING');
      return api.tool
        .editTool(data)
        .then(({data}) => {
          commit('LOADED');
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err, err.response)
          // return err.response.data;
        });
    },
    deleteTool({commit}, data) {
      commit('LOADING');
      return api.tool
        .deleteTool(data)
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
    tools: state => state.tools,
    viewing: state => state.viewing
  }
};
