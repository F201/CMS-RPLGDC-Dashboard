<template>
  <v-card elevation="5" color="primary white--text">
    <v-row>
      <v-col align="center" class="title">
        <v-icon dark>mdi-account</v-icon>
        Total Pendaftar
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters class="my-5">
      <v-col align="center" cols="12" class="display-3 font-weight-black">
        {{ countTotal }}
      </v-col>
      <v-col align="center" cols="12">
        Pendaftar
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn
          depressed
          class="text-uppercase primary--text"
          to="/recruitment"
        >
          See Detail
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    countTotal: 0
  }),
  async created() {
    await this.$store.dispatch('recruitment/getSumThp', {}).then(data=> {
      if (data) {
        this.countTotal = data.data.count
      }
      
    })
  }
}
</script>

<style>

</style>