<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Division</span>
      </v-card-title>
      <division-form v-model="divisionDetail" />
      <division-tool :id="id" :toolList="divisionDetail.tools" />
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
import DivisionForm from './DivisionForm';
import DivisionTool from './DivisionTools';
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  components: {
    DivisionForm,
    DivisionTool
  },
  data: () => ({
    formData: null,
  }),
  computed: {
    ...mapGetters({
      divisionDetail: 'division/divisionDetail',
      loadin: 'division/loading'
    })
  },
  methods: {
    close() {
      this.$store.commit('division/VIEWED');
    },
    fetch() {
      this.$store.dispatch('division/getDetailDivision', this.id);
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
