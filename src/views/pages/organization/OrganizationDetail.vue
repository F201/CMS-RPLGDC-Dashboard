<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Organization</span>
      </v-card-title>
      <organization-form v-model="formData"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <!-- <v-btn
          color="primary darken-1"
          :disabled="invalid || !validated"
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
import OrganizationForm from './OrganizationForm';
// import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    // ValidationObserver,
    OrganizationForm
  },
  data: () => ({
    name: '',
    jabatan: '',
    order: 0,
    icon: '',
    photo: null,
    formData: {
      disabled: true
    },
  }),
  methods: {
    close() {
      this.$store.commit('organization/VIEWED');
    },
    fetch() {
      this.$store.dispatch('organization/getDetailOrganization', this.id).then(data => {
        console.log(data)
        this.formData = {
          // ...data,
          name: data.nama_org_structures,
          jabatan: data.posisi_org_structures,
          img: {
            icon: data.foto_org_structures,
            photo: null,
            disabled: true
          },
          order: data.order_org_structures,
          disabled: true
        }
      });
    }
  },
  created() {
    this.fetch();
  }
}
</script>
