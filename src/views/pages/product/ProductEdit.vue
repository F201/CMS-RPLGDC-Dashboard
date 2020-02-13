<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Product</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <product-form v-model="formData"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <v-btn
          color="primary darken-1"
          :readonly="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import ProductForm from './ProductForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ProductForm
  },
  data: () => ({
    name: '',
    photo: null,
    formData: null,
  }),
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('nama_products', this.formData.name);
        form.append('gambar_products', this.formData.img.photo);
        this.$store.dispatch('product/editProduct', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('product/VIEWED');
            this.$store.dispatch('product/getAllProduct');
          });
      }
    },
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
        this.formData = {
          name: data.nama_products,
          img: {
            icon: data.gambar_products,
            photo: null,
          },
          readonly: false
        }
      });
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
