<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card outlined>
        <v-img
          :src="divisionItem.gambar_divisi"
          height="70"
          max-width="70"
          contain
        />
        {{divisionItem.nama_divisi}}
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="primary"
          >
            <v-btn @click="deleteTools(divisionItem.idx)" fab x-small color="red"><v-icon dark>mdi-close</v-icon></v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: ['activitiesId', 'divisionItem'],
  data: () => ({

  }),
  methods: {
    deleteTools(id) {
      this.$store.dispatch('actDivision/deleteActDivision', id).then(() => {
        this.$store.dispatch('activities/getDetailActivities', this.activitiesId)
      });
    }
  }
}
</script>
