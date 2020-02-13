import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    activities: [],
    actDetails: {
      img: {readonly: true},
      readonly: true,
      divisions: []
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
    SET_ACTIVITIES(state, data) {
      state.activities = data;
    },
    SET_ACTIVITIES_DIVISION(state, data) {
      state.actDetails = data;
    }
  },
  actions: {
    getAllActivities({ commit }) {
      commit('LOADING');
      return api.activities
        .getAllActivities()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ACTIVITIES', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          // // console.log(err)
          return false;
        });
    },
    getDetailActivities({ commit }, data) {
      commit('LOADING');
      return api.activities
        .getDetailActivities(data)
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_ACTIVITIES_DIVISION', {
            id: data.activities[0].id_activities,
            name: data.activities[0].nama_activities,
            tanggal: data.activities[0].tanggal,
            deskripsi: data.activities[0].deskripsi,
            divisions: data.activities[0].divisions,
            img: {
              icon: data.activities[0].gambar_activities,
              photo: null,
              readonly: true,
              ratio: 4 / 3
            },
            readonly: true
          });
          return data;
        })
        .catch(() => {
          commit('LOADED');
          // // console.log(err)
          return false;
        });
    },
    createActivities({commit}, data) {
      commit('LOADING');
      return api.activities
        .createActivities(data)
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
    },
    deleteActivities({commit}, data) {
      commit('LOADING');
      return api.activities
        .deleteActivities(data)
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
    editActivities({commit}, data) {
      commit('LOADING');
      return api.activities
        .editActivities(data)
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
    activities: state => state.activities,
    actDetails: state => state.actDetails,
    viewing: state => state.viewing
  }
};
