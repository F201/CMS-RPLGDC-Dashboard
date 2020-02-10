<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Organization</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <organization-form v-model="formData"/>
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
import OrganizationForm from './OrganizationForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    OrganizationForm
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
        form.append('nama_org_structures', this.formData.name);
        form.append('posisi_org_structures', this.formData.jabatan);
        form.append('order_org_structures', this.formData.order);
        form.append('foto_org_structures', this.formData.img.photo);
        this.$store.dispatch('organization/editOrganization', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('organization/VIEWED');
            this.$store.dispatch('organization/getAllOrganization');
          });
      }
    },
    close() {
      this.$store.commit('organization/VIEWED');
    },
    fetch() {
      this.$store.dispatch('organization/getDetailOrganization', this.id).then(data => {
        console.log(data)
        this.formData = {
          // ...data,
          id: data.id_org_structures,
          name: data.nama_org_structures,
          jabatan: data.posisi_org_structures,
          img: {
            icon: data.foto_org_structures,
            photo: null,
          },
          order: data.order_org_structures,
        }
      });
    }
  },
  created() {
    this.fetch();
  }
}
</script>
