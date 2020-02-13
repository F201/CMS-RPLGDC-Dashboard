import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    divisions: [],
    divisionDetail: {
      tools: []
    },
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
    SET_DIVISION(state, data) {
      state.divisions = data;
    },
    SET_DIVISION_DETAIL(state, data) {
      state.divisionDetail = data
    }
  },
  actions: {
    getAllDivision({ commit }) {
      commit('LOADING');
      return api.division
        .getAllDivision()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_DIVISION', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    getDetailDivision({ commit }, params) {
      commit('LOADING');
      return api.division
        .getDetailDivision(params)
        .then(({ data }) => {
          // console.log(data)
          commit('LOADED');
          commit('SET_DIVISION_DETAIL', {
            id: data.division[0].id_divisi,
            name: data.division[0].nama_divisi,
            deskripsi: data.division[0].deskripsi,
            tools: data.division[0].tools,
            img: {
              icon: data.division[0].gambar_divisi,
              photo: null,
              readonly: true
            },
            readonly: true
          })
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false;
          // console.log(err)
          // return err.response.data;
        });
    },
    createDivision({commit}, data) {
      commit('LOADING');
      return api.division
        .createDivision(data)
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
    editDivision({commit}, data) {
      commit('LOADING');
      return api.division
        .editDivision(data)
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
    deleteDivision({commit}, data) {
      commit('LOADING');
      return api.division
        .deleteDivision(data)
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
    divisions: state => state.divisions,
    divisionDetail: state => state.divisionDetail,
    viewing: state => state.viewing
  }
};
