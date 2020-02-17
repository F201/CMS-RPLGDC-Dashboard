<template>
  <v-card elevation="5" style="height:700px">
    <v-row justify="center" align="center" class="title">
      <v-col cols="12" align="center">
        <v-icon>mdi-poll</v-icon>
        Statistik Persebaran Divisi
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" align="start" style="height:60%" v-if="doneFetch">
      <v-col cols="2" align="center" v-for="(col, idx) in divisionStat" :key="idx" style="height:100%">
        <v-row align="end" justify="center" style="height:100%" no-gutters>
          <v-card
            dark
            :style="{
              width: '100%',
              backgroundColor: col.color,
              height:`${col.stat+30}%`,
              margin:'0 10px'
            }"
          >
            {{col.sum}}
          </v-card>
        </v-row>
        <div class="caption">
          {{col.divisi}}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    divisionStat: [],
    tempStat: [],
    listDivisi: [
      { divisi:'Front-end', value: 'frontend', color: '#48BEFF' },
      { divisi:'Back-end', value: 'backend', color: '#FA9627' },
      { divisi:'Mobile', value: 'mobile', color: '#5CB7B8' },
      { divisi:'GDC', value: 'gdc', color: '#F5582B' },
      { divisi:'UI/UX', value: 'uiux', color: '#E8537B' }
    ],
    totalSum: 0,
    doneFetch: false
  }),
  methods: {
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },
    async fetch() {
      this.doneFetch = false;
      await this.asyncForEach(this.listDivisi, async (el) => {
        let temp = await this.$store.dispatch('recruitment/getSumThp', {div: el.value});
        if (temp) this.setDivisiSum(el, temp.data.count)
      })
      await this.asyncForEach(this.divisionStat, async (el, idx) => {
        this.$set(this.divisionStat[idx], 'stat', Math.floor((el.sum / this.totalSum) * 100)) // eslint-disable-line
      })
      this.doneFetch = true;
    },
    setDivisiSum(elm,sum) {
      this.totalSum += sum;
      this.divisionStat.push({
        divisi: elm.divisi,
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