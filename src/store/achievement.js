import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    achievements: [],
    achievDetail: {
      img: {readonly: true},
      readonly: true,
      members: []
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
    SET_ACHIEVEMENT(state, data) {
      state.achievements = data;
    },
    SET_ACHIEVEMENT_DETAIL(state, data) {
      state.achievDetail = data;
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
          // console.log(err)
          return err.response.data;
        });
    },
    getDetailAchievement({ commit }, data) {
      commit('LOADING');
      return api.achievement
        .getDetailAchievement(data)
        .then(({ data }) => {
          console.log(data)
          commit('LOADED');
          commit('SET_ACHIEVEMENT_DETAIL', {
            id: data.achievement[0].id_achievement,
            judul: data.achievement[0].judul,
            tahun: data.achievement[0].tahun,
            peringkat: data.achievement[0].peringkat,
            members: data.achievement[0].members,
            img: {
              icon: data.achievement[0].foto_achievement,
              photo: null,
              readonly: true
            },
            readonly: true
          });
          console.log(data)
          return data;
        })
        .catch(err => {
          commit('LOADED');
          // console.log(err)
          return err.response.data;
        });
    },
    createAchievement({commit}, data) {
      commit('LOADING');
      return api.achievement
        .createAchievement(data)
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
    deleteAchievement({commit}, data) {
      commit('LOADING');
      return api.achievement
        .deleteAchievement(data)
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
    achievements: state => state.achievements,
    achievDetail: state => state.achievDetail,
    viewing: state => state.viewing
  }
};
