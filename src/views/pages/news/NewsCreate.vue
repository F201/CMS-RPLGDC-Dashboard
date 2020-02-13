<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Create News</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <news-form v-model="formData"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <v-btn
          color="primary darken-1"
          :disabled="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import NewsForm from './NewsForm';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    NewsForm
  },
  data: () => ({
    photo: null,
    formData: null,
  }),
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('judul', this.formData.judul);
        form.append('deskripsi', this.formData.deskripsi);
        form.append('order_news', this.formData.order);
        form.append('link_url', this.formData.link_url);
        form.append('gambar', this.formData.img.photo);
        this.$store.dispatch('news/createNews', form)
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Create', 'Data created!', 'success');
            else this.$swal('Error', 'Error on create data!', 'error')
            this.$store.commit('news/VIEWED');
            this.$store.dispatch('news/getAllNews');
          });
      }
    },
    close() {
      this.$store.commit('news/VIEWED');
    }
  }
}
</script>
