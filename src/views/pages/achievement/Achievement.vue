<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Achievement
      </v-card-title>
      <v-row no-gutters justify="center" align="center">
        <v-col class="px-4" cols="6" align="center">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="center" cols="3">
          <v-btn @click.stop="create()" class="primary">
            Create Request
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="dataAchievement"
        :search="search"
      ></v-data-table>
    </v-card>
    <v-dialog v-model="isViewing" max-width="700px">
      <achievement-create-card v-if="isViewing" :id="0" />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import AchievementCreateCard from './AchievementCreate';
export default {
  components: {
    AchievementCreateCard
  },
  computed: {
    ...mapGetters({
      dataAchievement: 'achievement/achievements'
    }),
    isViewing: {
      get: function() {
        return this.$store.getters['achievement/viewing'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('achievement/VIEWED');
      }
    },
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'Judul', align: 'left', value: 'judul' },
      { text: 'Nama Pemenang', value: 'nama_pemenang' },
      { text: 'Jurusan', value: 'jurusan' },
      { text: 'Tahun', value: 'tahun' },
      { text: 'Peringkat', value: 'peringkat' },
      { text: 'Foto', value: 'foto_achievement' },
    ],
  }),
  methods:{
    create() {
      this.$store.commit('achievement/VIEWING');
    }
  },
  created() {
    this.$store.dispatch('achievement/getAllAchievement');
  }
};
</script>
