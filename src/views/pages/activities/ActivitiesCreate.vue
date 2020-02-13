<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Create Achievement</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <achievement-form v-model="formData" />
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
import AchievementForm from './AchievementForm';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    AchievementForm,
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
        form.append('judul', this.formData.judul);
        form.append('tahun', this.formData.tahun);
        form.append('peringkat', this.formData.peringkat);
        form.append('foto_achievement', this.formData.img.photo);
        this.$store.dispatch('achievement/createAchievement', form)
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Create', 'Data created!', 'success');
            else this.$swal('Error', 'Error on create data!', 'error')
            this.$store.commit('achievement/VIEWED');
            this.$store.dispatch('achievement/getAllAchievement');
          });
      }
    },
    close() {
      this.$store.commit('achievement/VIEWED');
    }
  }
}
</script>
