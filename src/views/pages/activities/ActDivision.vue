<template>
  <v-container class="py-0 px-2 pb-2">
    <v-row no-gutters justify="center">
      <v-col cols="7" offset="3">
        <v-row align="center" class="my-2">
          <v-col class="body-1" cols="auto">Division</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="addDivision()" color="primary" text>Add Division</v-btn>
          </v-col>
        </v-row>
        <v-card outlined class="pa-3">
          <v-row>
            <template v-if="divisionList.length <= 0">
              <v-col align="center">
                No Data Found
              </v-col>
            </template>
            <template v-else>
              <v-col align="center" cols="auto" px-1 py-1 v-for="(item, idx) in divisionList" :key="idx" >
                <act-division-item :activitiesId="id" :divisionItem="item" />
              </v-col>
            </template>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="isPopup" max-width="500px">
      <act-division-add v-if="isPopup" :id_activities="id"/>
    </v-dialog>
  </v-container>
</template>

<script>
import ActDivisionAdd from './ActDivisionAdd';
import ActDivisionItem from './ActDivisionItem';
import { mapGetters } from 'vuex';

export default {
  props: ['id', 'divisionList'],
  components: {
    ActDivisionAdd,
    ActDivisionItem
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      loading: 'actDivision/loading'
    }),
    isPopup: {
      get: function() {
        return this.$store.getters['actDivision/addingDivision'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('actDivision/ADDED_DIVISION');
      }
    },
  },
  methods: {
    addDivision() {
      this.$store.commit('actDivision/ADDING_DIVISION');
    },
    fetch() {
      this.$store.dispatch('activities/getDetailActivities', this.id);
    }
  },
  mounted() {
    // this.fetch();
  }
}
</script>

<style>

</style>