import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    productTools: [],
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
    SET_PRODUCT_TOOLS(state, data) {
      state.productTools = data;
    }
  },
  actions: {
    getProductTools({ commit }, params) {
      commit('LOADING');
      return api.productTool
        .getProductTools(params)
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
    addProductTools({ commit }, data) {
      commit('LOADING');
      return api.productTool
        .addProductTool(data)
        .then(({ data }) => {
          commit('LOADED');
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false
          // console.log(err)
          // return err.response.data;
        });
    },
    deleteProductTool({commit}, params) {
      commit('LOADING');
      return api.productTool
        .deleteProductTool(params)
        .then(({data}) => {
          commit('LOADED');
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false
          // console.log(err, err.response)
          // return err.response.data;
        });
    }
  },
  getters: {
    loading: state => state.loading,
    productTools: state => state.productTools,
    addingTool: state => state.addingTool,
    viewing: state => state.viewing
  }
};
