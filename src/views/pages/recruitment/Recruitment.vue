<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Recruitment
      </v-card-title>
      <v-tabs
        v-model="tab"
      >
        <v-tab
          v-for="(n, i) in 3"
          :key="i"
          :href="`#tahap${i}`"
        >
          {{
            i == 0 ? 'Registrasi' : `Tahap ${i}`
          }}
        </v-tab>
      </v-tabs>
      <v-row no-gutters align="center">
        <v-col class="px-4" cols="6" align="center">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col align="center" cols="3">
          <v-btn @click.stop="view()" class="primary">
            Create Request
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn fab small elevation="2" @click="view(item.id)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="isViewing" max-width="700px">
      <recruitment-detail-card v-if="isViewing" :id="0" />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import RecruitmentDetailCard from './RecruitmentDetail';

export default {
  components: {
    RecruitmentDetailCard
  },
  computed: {
    ...mapGetters({
      dataRecruitment: 'recruitment/recruitments'
    }),
    isViewing: {
      get: function() {
        return this.$store.getters['recruitment/viewing'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('recruitment/VIEWED');
      }
    },
  },
  data: () => ({
    search: '',
    items: [
      { name: 'nama'}
    ],
    headers: [
      { text: 'Foto', value: 'foto_achievement' },
      { text: 'Nama', align: 'left', value: 'name' },
      { text: 'Tanggal Lahir', value: 'nama_pemenang' },
      { text: 'Gender', value: 'jurusan' },
      { text: 'Angkatan', value: 'tahun' },
      { text: 'Divisi', value: 'divisi' },
      { text: 'Action', value: 'action' }
      // { text: 'CV', value: 'divisi' },
      // { text: 'Motivaiton Letter', value: 'divisi' },
      // { text: 'Portofolio', value: 'divisi' }
    ],
  }),
  methods: {
    view(id) {
      console.log(id)
      this.$store.commit('recruitment/VIEWING');
    }
  },
  created() {
    this.$store.dispatch('recruitment/getAllRecruitment');
  },
  watch: {
    tab(tahap){
      let params = ''
      if (tahap != 'tahap0') {
        console.log('fetch tahap')
        params = tahap
      }
      this.$store.dispatch(`recruitment/getAllRecruitment`,params);
    }
  }
};
</script>
