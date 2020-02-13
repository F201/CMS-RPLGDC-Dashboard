import api from '../api/api';

export default {
  namespaced: true,
  state: {
    loading: false,
    products: [],
    productDetail: {
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
    SET_PRODUCT(state, data) {
      state.products = data;
    },
    SET_PRODUCT_DETAIL(state, data) {
      state.productDetail = data;
    }
  },
  actions: {
    getAllProduct({ commit }) {
      commit('LOADING');
      return api.product
        .getAllProduct()
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_PRODUCT', data.data)
          return data;
        })
        .catch(() => {
          commit('LOADED');
          return false
          // console.log(err)
          // return err.response.data;
        });
    },
    getDetailProduct({ commit }, params) {
      commit('LOADING');
      return api.product
        .getDetailProduct(params)
        .then(({ data }) => {
          commit('LOADED');
          commit('SET_PRODUCT_DETAIL', {
            id: data.product[0].id_products,
            name: data.product[0].nama_products,
            kategori: data.product[0].kategori_products,
            deskripsi: data.product[0].deskripsi,
            tools: data.product[0].tools,
            img: {
              icon: data.product[0].gambar_products,
              photo: null,
              readonly: true
            },
            readonly: true
          });
          return data.product[0];
        })
        .catch(() => {
          commit('LOADED');
          return false
          // console.log(err)
          // return err.response.data;
        });
    },
    createProduct({commit}, data) {
      commit('LOADING');
      return api.product
        .createProduct(data)
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
    editProduct({commit}, data) {
      commit('LOADING');
      return api.product
        .editProduct(data)
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
    deleteProduct({commit}, data) {
      commit('LOADING');
      return api.product
        .deleteProduct(data)
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
    products: state => state.products,
    productDetail: state => state.productDetail,
    viewing: state => state.viewing
  }
};
