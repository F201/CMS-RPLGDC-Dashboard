<template>
  <div>
    <v-container>
      <v-row justify="center" style="height:100%">
        <v-col cols="4" md="4">
          <statistics-recruitment style="height:100%" />
        </v-col>
        <v-col cols="6" offset="2" md="6" offset-md="1">
          <statistics-division style="height:100%" />
        </v-col>
      </v-row>
      <v-row style="height:100%">
        <v-col cols="4" md="4">
          <statistics-recruitment style="height:100%" />
        </v-col>
        <v-col cols="6" offset="2" md="6" offset-md="1">
          <statistics-division style="height:100%" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StatisticsDivision from './StatisticsDivision';
import StatisticsRecruitment from './StatisticsRecruitment';

export default {
  components: {
    StatisticsDivision,
    StatisticsRecruitment
  }
}
</script>
