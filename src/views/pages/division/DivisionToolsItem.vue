<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card outlined>
        <v-img
          :src="toolItem.gambar_tools"
          height="70"
          max-width="70"
          contain
        />
        {{toolItem.nama_tools}}
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="primary"
          >
            <v-btn @click="deleteTools(toolItem.idx)" fab x-small color="red"><v-icon dark>mdi-close</v-icon></v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: ['divisionId', 'toolItem'],
  data: () => ({

  }),
  methods: {
    deleteTools(id) {
      this.$store.dispatch('divisionTool/deleteDivisionTool', id).then(() => {
        this.$store.dispatch('division/getDetailDivision', this.divisionId)
      });
    }
  }
}
</script>
