<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Tool</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <tool-form v-model="formData"/>
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
import ToolForm from './ToolForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ToolForm
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
        form.append('nama_tools', this.formData.name);
        form.append('gambar_tools', this.formData.img.photo);
        this.$store.dispatch('tool/editTool', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('tool/VIEWED');
            this.$store.dispatch('tool/getAllTool');
          });
      }
    },
    close() {
      this.$store.commit('tool/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('tool/getDetailTool', this.id).then(data => {
        // console.log(data)
        this.formData = {
          name: data.nama_tools,
          img: {
            icon: data.gambar_tools,
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
