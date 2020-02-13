<template>
  <v-container class="py-0 px-2 pb-2">
    <v-row no-gutters justify="center">
      <v-col cols="7" offset="3">
        <v-row align="center" class="my-2">
          <v-col class="body-1" cols="auto">Member</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="addMember()" color="primary" text>Add Member</v-btn>
          </v-col>
        </v-row>
        <v-card outlined class="pa-3">
          <v-data-table
            :headers="headers"
            :items="memberList"
          >
          </v-data-table>
          <!-- <v-row>
            <template v-if="toolList.tools.length <= 0">
              <v-col align="center">
                No Data Found
              </v-col>
            </template>
            <template v-else>
              <v-col align="center" cols="auto" px-1 py-1 v-for="(item, idx) in toolList.tools" :key="idx" >
                <product-tools-item :productId="id" :toolItem="item" />
              </v-col>
            </template>
            <v-col align="center" cols="auto" px-1 py-1 v-for="(item, idx) in dataProductTools" :key="idx" >
              <product-tools-item :tool="item" />
            </v-col>
          </v-row> -->
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="isPopup" max-width="500px">
      <achiev-member-add v-if="isPopup" :id_achievement="id"/>
    </v-dialog>
  </v-container>
</template>

<script>
import AchievMemberAdd from './AchivMemberAdd';
import { mapGetters } from 'vuex';

export default {
  props: ['id', 'memberList'],
  components: {
    AchievMemberAdd
  },
  data: () => ({
    headers: [
      { text: 'Nama', align: 'center', value: 'nama_member' },
      { text: 'Jurusan', align: 'center', value: 'jurusan' },
      { text: 'Angkatan', align: 'center', value: 'angkatan' }
    ]
  }),
  computed: {
    ...mapGetters({
      loading: 'achievMember/loading'
    }),
    isPopup: {
      get: function() {
        return this.$store.getters['achievMember/addingMember'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('achievMember/ADDED_MEMBER');
      }
    },
  },
  methods: {
    addMember() {
      this.$store.commit('achievMember/ADDING_MEMBER');
    },
    fetch() {
      this.$store.dispatch('achievement/getDetailAchievement', this.id);
    }
  },
  mounted() {
    // this.fetch();
  }
}
</script>

<style>

</style>