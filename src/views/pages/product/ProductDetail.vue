<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Product</span>
      </v-card-title>
      <product-form v-model="productDetail" />
      <product-tools :id="id" :toolList="productDetail" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import ProductForm from './ProductForm';
import ProductTools from './ProductTools';
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  components: {
    ProductForm,
    ProductTools
  },
  data: () => ({
    formData: {
      id: null
    },
  }),
  computed: {
    ...mapGetters({
      productDetail: 'product/productDetail',
      loading: 'product/loading'
    }),
  },
  methods: {
    close() {
      this.$store.commit('product/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('product/getDetailProduct', this.id).then(data => {
        // console.log(data)
        if (data) {
          this.formData = {
              id: data.id_products,
              name: data.nama_products,
              kategori: data.kategori_products,
              deskripsi: data.deskripsi,
              tools: data.tools,
              img: {
                icon: data.gambar_products,
                photo: null,
                readonly: true
              },
              readonly: true
            } 
          }
        });
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
