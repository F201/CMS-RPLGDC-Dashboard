<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Tool</span>
      </v-card-title>
      <tool-form v-model="formData"/>
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
import ToolForm from './ToolForm';

export default {
  props: ['id'],
  components: {
    ToolForm
  },
  data: () => ({
    formData: null,
  }),
  methods: {
    close() {
      this.$store.commit('tool/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {readonly: true},
        readonly: true
      };
      this.$store.dispatch('tool/getDetailTool', this.id).then(data => {
        this.formData = {
          name: data.nama_tools,
          img: {
            icon: data.gambar_tools,
            photo: null,
            readonly: true
          },
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
