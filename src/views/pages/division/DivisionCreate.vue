<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Create Division</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <division-form v-model="formData"/>
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
import DivisionForm from './DivisionForm';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    DivisionForm
  },
  data: () => ({
    formData: null,
  }),
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('nama_divisi', this.formData.name);
        form.append('gambar_divisi', this.formData.img.photo);
        form.append('deskripsi', this.formData.deskripsi);
        this.$store.dispatch('division/createDivision', form)
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Create', 'Data created!', 'success');
            else this.$swal('Error', 'Error on create data!', 'error')
            this.$store.commit('division/VIEWED');
            this.$store.dispatch('division/getAllDivision');
          });
      }
    },
    close() {
      this.$store.commit('division/VIEWED');
    }
  }
}
</script>
