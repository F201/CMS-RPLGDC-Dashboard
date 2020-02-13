<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Organization</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <activities-form v-model="formData"/>
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
import ActivitiesForm from './ActivitiesForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ActivitiesForm
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
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('nama_activities', this.formData.name);
        form.append('tanggal', this.formData.tanggal);
        form.append('deskripsi', this.formData.deskripsi);
        form.append('gambar_activities', this.formData.img.photo);
        this.$store.dispatch('activities/editActivities', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('activities/VIEWED');
            this.$store.dispatch('activities/getAllActivities');
          });
      }
    },
    close() {
      this.$store.commit('activities/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('activities/getDetailActivities', this.id).then(data => {
        // console.log(data)
        this.formData = {
          id: data.id_org_structures,
          name: data.nama_org_structures,
          jabatan: data.posisi_org_structures,
          img: {
            icon: data.foto_org_structures,
            photo: null,
          },
          order: data.order_org_structures,
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
