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
          :href="`#status${i}`"
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
      </v-row>
      <v-data-table
        :headers="headers"
        :items="dataRecruitment"
        :search="search"
        :loading="loading"
        multi-sort
      >
        <template v-slot:item.foto_profile="{ item }">
          <v-row>
            <v-col align="center">
              <v-img
                :src="item.foto_profile"
                height="70"
                width="70"
                lazy-src="../../../assets/square.png"
              ></v-img>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip color="green" small class="white--text" v-if="item.status1">
            1
          </v-chip>
          <v-chip color="green" small class="white--text" v-if="item.status2">
            2
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn fab small elevation="2" @click="view(item.id_recruitment)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="isViewing" max-width="700px">
      <component :is="selectedPopup" v-if="isViewing" v-bind="propPopup"/>
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
      dataRecruitment: 'recruitment/recruitments',
      loading: 'recruitment/loading'
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
    tab: null,
    search: '',
    propPopup: '',
    selectedPopup: '',
    headers: [
      { text: 'Foto', value: 'foto_profile', align: 'center' },
      { text: 'Nama', align: 'left', value: 'nama_lengkap' },
      { text: 'NIM', align: 'center', value: 'nim' },
      { text: 'Gender', value: 'jenis_kelamin' },
      { text: 'Angkatan', value: 'angkatan' },
      { text: 'Divisi', value: 'divisi' },
      { text: 'Status', value: 'status' },
      { text: 'Action', value: 'action' }
      // { text: 'CV', value: 'divisi' },
      // { text: 'Motivaiton Letter', value: 'divisi' },
      // { text: 'Portofolio', value: 'divisi' }
    ],
  }),
  methods: {
    view(id) {
      this.propPopup = {
        id: id
      }
      this.selectedPopup = 'RecruitmentDetailCard';
      this.$store.commit('recruitment/VIEWING');
    }
  },
  created() {
    this.$store.dispatch('recruitment/getAllRecruitment');
  },
  watch: {
    tab(tahap){
      let params = {};
      if (tahap != 'status0') {
        params[tahap] = 1;
      }
      this.$store.dispatch(`recruitment/getAllRecruitment`, params);
    }
  }
};
</script>
