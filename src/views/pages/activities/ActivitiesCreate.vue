<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Create Activities</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <activities-form v-model="formData" />
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
import ActivitiesForm from './ActivitiesForm';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ActivitiesForm,
    ValidationObserver
  },
  data: () => ({
    icon: '',
    isEdit: false,
    cropmodal: false,
    photo: null,
    icon_edit: '',
    formData: null
  }),
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('nama_activities', this.formData.name);
        form.append('tanggal', this.formData.tanggal);
        form.append('deskripsi', this.formData.deskripsi);
        form.append('gambar_activities', this.formData.img.photo);
        this.$store.dispatch('activities/createActivities', form)
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Create', 'Data created!', 'success');
            else this.$swal('Error', 'Error on create data!', 'error')
            this.$store.commit('activities/VIEWED');
            this.$store.dispatch('activities/getAllActivities');
          });
      }
    },
    close() {
      this.$store.commit('activities/VIEWED');
    }
  }
}
</script>
