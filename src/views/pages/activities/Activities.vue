<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Activities
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
            Create +
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="dataActivities"
        :search="search"
        :loading="loading"
      >
        <template v-slot:item.gambar_activities="{ item }">
          <v-row>
            <v-col align="center">
              <v-img
                :src="item.gambar_activities"
                height="70"
                width="70"
                lazy-src="@/assets/square.png"
              ></v-img>
              
            </v-col>
          </v-row>
            
        </template>
        <template v-slot:item.action="{ item }">
          <!-- <v-btn fab small elevation="2" @click="view(item.id_org_structures)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn fab small elevation="2" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="viewData(item.id_activities)">
                <v-list-item-title
                  ><v-icon>mdi-information</v-icon>Detail</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="editData(item.id_activities)">
                <v-list-item-title
                  ><v-icon>mdi-pencil</v-icon>Edit</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="deleteData(item.id_activities)">
                <v-list-item-title
                  ><v-icon>mdi-delete</v-icon>Detele</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="isViewing" max-width="700px">
      <component :is="selectedPopup" v-if="isViewing" v-bind="propPopup" />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ActivitiesCreateCard from './ActivitiesCreate';
import ActivitiesDetailCard from './ActivitiesDetail';
import ActivitiesEditCard from './ActivitiesEdit';

export default {
  components: {
    ActivitiesCreateCard,
    ActivitiesDetailCard,
    ActivitiesEditCard
  },
  computed: {
    ...mapGetters({
      dataActivities: 'activities/activities',
      loading: 'activities/loading'
    }),
    isViewing: {
      get: function() {
        return this.$store.getters['activities/viewing'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('activities/VIEWED');
      }
    },
  },
  data: () => ({
    search: '',
    propPopup: null,
    selectedPopup: null,
    headers: [
      { text: 'Foto', value: 'gambar_activities' },
      { text: 'Nama', align: 'left', value: 'nama_activities' },
      { text: 'Tanggal', value: 'tanggal' },
      { text: 'Deskripsi', value: 'deskripsi' },
      { text: 'Action', value: 'action' }
    ]
  }),
  methods:{
    create() {
      this.selectedPopup = 'ActivitiesCreateCard';
      this.$store.commit('activities/VIEWING');
    },
    viewData(id) {
      console.log(id)
      this.selectedPopup = 'ActivitiesDetailCard';
      this.propPopup = {
        id: id
      };
      this.$store.commit('activities/VIEWING');
    },
    editData(id) {
      this.selectedPopup = 'ActivitiesEditCard';
      this.propPopup = {
        id: id
      };
      this.$store.commit('activities/VIEWING');
    },
    deleteData(id) {
      this.$store.dispatch('activities/deleteActivities', id).then(() => {
        this.fetch();
      });
    },
    fetch() {
      this.$store.dispatch('activities/getAllActivities');
    }
  },
  created() {
    this.fetch();
  }
};
</script>
