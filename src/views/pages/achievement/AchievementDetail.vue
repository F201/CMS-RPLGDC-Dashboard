<template>
  <v-card>
    <!-- <ValidationObserver ref="obs" v-slot="{ invalid, validated }"> -->
      <v-card-title class="pa-5">
        <span class="headline">Detail Achievement</span>
      </v-card-title>
      <achievement-form v-model="achievDetail"/>
      <achiev-member :id="id" :memberList="achievDetail.members" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <!-- <v-btn
          color="primary darken-1"
          :readonly="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn> -->
      </v-card-actions>
      <!-- <div v-if="formData.img">
        {{this.formData.img.photo}}
      </div> -->
      
    <!-- </ValidationObserver> -->
  </v-card>
</template>

<script>
import AchievementForm from './AchievementForm';
import AchievMember from './AchievMember';
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  components: {
    AchievMember,
    AchievementForm
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      achievDetail: 'achievement/achievDetail',
      loading: 'achievement/loading'
    }),
  },
  methods: {
    close() {
      this.$store.commit('achievement/VIEWED');
    },
    fetch() {
      this.$store.dispatch('achievement/getDetailAchievement', this.id);
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
