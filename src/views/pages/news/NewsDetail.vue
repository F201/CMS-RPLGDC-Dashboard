<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail News</span>
      </v-card-title>
      <news-form v-model="formData"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <!-- <v-btn
          color="primary darken-1"
          :readonly="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn> -->
      </v-card-actions>
      <!-- <div v-if="formData.img">
        {{this.formData.img.photo}}
      </div> -->
      
    <!-- </ValidationObserver> -->
  </v-card>
</template>

<script>
import NewsForm from './NewsForm';
// import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    // ValidationObserver,
    NewsForm
  },
  data: () => ({
    name: '',
    jabatan: '',
    order: 0,
    icon: '',
    photo: null,
    formData: null,
  }),
  methods: {
    close() {
      this.$store.commit('news/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('news/getDetailNews', this.id).then(data => {
        this.formData = {
          judul: data.judul,
          deskripsi: data.deskripsi,
          link_url: data.link_url,
          img: {
            ratio: 4 / 3,
            icon: data.gambar,
            photo: null,
            readonly: true
          },
          order: data.order_news,
          readonly: true
        }
      });
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
