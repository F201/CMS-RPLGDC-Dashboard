<template>
  <v-card elevation="5" style="height:100%">
    <v-row justify="center" align="center" class="title">
      <v-col cols="12" align="center">
        <v-icon>mdi-poll</v-icon>
        Statistik Persebaran Angkatan
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <doughnut-chart
          :chartData="chartsData"
          :options="chartOption"
          :style="{position: 'relative', height: '200px'}"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DoughnutChart from '@/components/DonutChart';

export default {
  components: {
    DoughnutChart
  },
  data: () => ({
    angkatanStat: [],
    tempStat: [],
    listAngkatan: [
      { value:'2017', color: '#FF783A' },
      { value:'2018', color: '#CE5A25' },
      { value:'2019', color: '#93411A' },
    ],
    totalSum: 0,
    doneFetch: false,
    chartsData: {},
    chartOption: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
    },
  }),
  methods: {
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },
    async fetch() {
      this.doneFetch = false;
      await this.asyncForEach(this.listAngkatan, async (el) => {
        let temp = await this.$store.dispatch('recruitment/getSumThp', {angkatan: el.value});
        if (temp) this.setDivisiSum(el, temp.data.count)
      })
      this.chartsData = {
            labels: this.angkatanStat.map(el => {return el.angkatan}),
            datasets: [
              {
                data: this.angkatanStat.map(el => {return el.sum}),
                backgroundColor: this.angkatanStat.map(el => {return el.color}),
                borderWidth: 1,
                weight: 0.5
              },
            ],
          } 
      this.doneFetch = true;
    },
    setDivisiSum(elm,sum) {
      this.totalSum += sum;
      this.angkatanStat.push({
        angkatan: elm.value,
        sum: sum,
        color: elm.color,
        stat: 0
      })
    }
  },
  created() {
    this.fetch();
  }
}
</script>

<style>

</style>