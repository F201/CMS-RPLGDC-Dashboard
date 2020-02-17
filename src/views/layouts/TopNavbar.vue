<template>
    <v-app-bar
      short
      flat
      color="white"
    >
      <v-row class="mx-5 body-1 font-weight-black" align="center">
        <v-col cols="auto" v-if="$vuetify.breakpoint.mdAndDown">
          <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
        </v-col>
        <v-col>
          {{dateTime}} - <span class="primary--text">{{liveTime}}</span> 
        </v-col>
      </v-row>
      <!-- <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-row no-gutters align="center">
          <v-col cols="2">
            <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
          </v-col>
          <v-col>
            <v-img
              class="mx-2"
              :src="require('@/assets/logo.png')"
              max-height="100"
              max-width="100"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on" slot="activator" class="mr-3">
            <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="40" color="primary">
              <v-icon dark>mdi-account</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content v-if="user">
              <v-list-item-title>{{ user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu> -->
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    liveTime: '',
    dateTime: ''
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
    // logout() {
    //   this.$store.dispatch('auth/logout').then(() => {
    //     this.$router.push('/login');
    //   });
    // }
    getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.dateTime = date;
      this.liveTime = time;
    }
  }
};
</script>
