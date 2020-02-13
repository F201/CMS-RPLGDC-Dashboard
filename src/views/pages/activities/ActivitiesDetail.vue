<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Achievement</span>
      </v-card-title>
      <activities-form v-model="actDetails"/>
      <act-division :id="id" :divisionList="actDetails.divisions" />
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
import ActivitiesForm from './ActivitiesForm';
import ActDivision from './ActDivision';
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  components: {
    ActDivision,
    ActivitiesForm
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      actDetails: 'activities/actDetails',
      loading: 'activities/loading'
    }),
  },
  methods: {
    close() {
      this.$store.commit('activities/VIEWED');
    },
    fetch() {
      this.$store.dispatch('activities/getDetailActivities', this.id);
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
