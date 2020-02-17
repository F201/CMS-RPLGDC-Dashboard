<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <statistics-recruitment style="height:100%" />
      </v-col>
      <v-col cols="12" md="7" offset-md="1">
        <statistics-division style="height:250px" />
      </v-col>
    </v-row>
    <v-row justify="center" style="height:100%">
      <v-col cols="12" md="6">
        <statistics-angkatan style="height:100%" />
      </v-col>
      <v-col cols="12" md="5" offset-md="1">
        <v-card elevation="5" color="primary white--text" style="height:100%"></v-card>
        <!-- <statistics-recruitment style="height:100%" /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatisticsDivision from './StatisticsDivision';
import StatisticsRecruitment from './StatisticsRecruitment';
import StatisticsAngkatan from './StatisticsAngkatan';

export default {
  components: {
    StatisticsDivision,
    StatisticsRecruitment,
    StatisticsAngkatan
  }
}
</script>
