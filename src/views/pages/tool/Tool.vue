<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Tool
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
        :items="dataTool"
        :search="search"
        :loading="loading"
      >
        <template v-slot:item.gambar_tools="{ item }">
          <v-row>
            <v-col align="center">
              <v-img
                :src="item.gambar_tools"
                height="70"
                width="70"
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
              <v-list-item @click="viewData(item.id_tools)">
                <v-list-item-title
                  ><v-icon>mdi-information</v-icon>Detail</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="editData(item.id_tools)">
                <v-list-item-title
                  ><v-icon>mdi-pencil</v-icon>Edit</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="deleteData(item.id_tools)">
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
      <component :is="selectedPopup" v-if="isViewing" v-bind="propPopup"/>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ToolCreateCard from './ToolCreate';
import ToolDetailCard from './ToolDetail';
import ToolEditCard from './ToolEdit';

export default {
  components: {
    ToolCreateCard,
    ToolDetailCard,
    ToolEditCard
  },
  computed: {
    ...mapGetters({
      dataTool: 'tool/tools',
      loading: 'tool/loading'
    }),
    isViewing: {
      get: function() {
        return this.$store.getters['tool/viewing'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('tool/VIEWED');
      }
    },
  },
  data: () => ({
    search: '',
    selectedPopup: null,
    propPopup: null,
    headers: [
      { text: 'Foto', align: 'center', value: 'gambar_tools' },
      { text: 'Nama', value: 'nama_tools' },
      { text: 'Action', value: 'action', width: '10%'}
    ],
  }),
  methods:{
    create() {
      this.selectedPopup = 'ToolCreateCard';
      this.$store.commit('tool/VIEWING');
    },
    viewData(id) {
      this.selectedPopup = 'ToolDetailCard';
      this.propPopup = {
        id: id
      };
      this.$store.commit('tool/VIEWING');
    },
    editData(id) {
      this.selectedPopup = 'ToolEditCard';
      this.propPopup = {
        id: id
      };
      this.$store.commit('tool/VIEWING');
    },
    deleteData(id) {
      this.$store.dispatch('tool/deleteTool', id).then(() => {
        this.fetch();
      });
    },
    fetch(){
      this.$store.dispatch('tool/getAllTool');
    }
  },
  created() {
    this.fetch();
    // .then(async data => {
    //   let response = await fetch(data.data[0].foto_org_structures)
    //   let dataImg = await response.blob();
    //   let metadata = {
    //     type: 'image/jpeg'
    //   };
    //   let file = new File([dataImg], "test.jpg", metadata);
    //   console.log(file)
    // });
  }
};
</script>
