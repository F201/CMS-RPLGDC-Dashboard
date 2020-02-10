import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    organizations: [],
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
    SET_ORGANIZATION(state, data) {
      state.organizations = data;
    }
  },
  actions: {
    getAllOrganization({ commit }) {
      commit('LOADING');
      return api.organization
        .getAllOrganization()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ORGANIZATION', data.data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    getDetailOrganization({ commit }, params) {
      commit('LOADING');
      return api.organization
        .getDetailOrganization(params)
        .then(({ data }) => {
          commit('LOADED');
          // commit('SET_ORGANIZATION', data.data)
          return data.data;
        })
        .catch(err => {
          commit('LOADED');
          console.log(err)
          // return err.response.data;
        });
    },
    createOrganization({commit}, data) {
      commit('LOADING');
      return api.organization
        .createOrganization(data)
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
    editOrganization({commit}, data) {
      commit('LOADING');
      return api.organization
        .editOrganization(data)
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
    deleteOrganization({commit}, data) {
      commit('LOADING');
      return api.organization
        .deleteOrganization(data)
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
    organizations: state => state.organizations,
    viewing: state => state.viewing
  }
};
