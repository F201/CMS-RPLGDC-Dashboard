<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Division</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <division-form v-model="formData"/>
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
import DivisionForm from './DivisionForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
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
        this.$store.dispatch('division/editDivision', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('division/VIEWED');
            this.$store.dispatch('division/getAllDivision');
          });
      }
    },
    close() {
      this.$store.commit('division/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('division/getDetailDivision', this.id).then(data => {
        this.formData = {
          id: data.id_divisi,
          name: data.nama_divisi,
          deskripsi: data.deskripsi,
          studyGroup: '',
          brainspark: '',
          img: {
            required: false,
            icon: data.gambar_divisi,
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
