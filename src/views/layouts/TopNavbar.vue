<template>
    <v-app-bar
      
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-row no-gutters align="center">
          <v-col cols="2">
            <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
            <!-- iGadis -->
            <!-- <img style="width:60%;" src="@/assets/logo.png" alt="logo"/> -->
            <!-- <v-img
              :src="require('@/assets/logo.png')"
              
              contain
              lazy-src
            >
            </v-img> -->
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
      <!-- <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
      <v-menu offset-y>
      <!-- <v-btn icon slot="activator" class="mr-3">
        <v-avatar size="28" v-if="user">
          <img :src="avatarImageUrl" align="menu" />
        </v-avatar>
      </v-btn> -->
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on" slot="activator" class="mr-3">
          <!-- <v-avatar size="41" color="secondary"> -->
            <v-icon>mdi-account</v-icon>
          <!-- </v-avatar> -->
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="40" color="primary">
              <v-icon dark>mdi-account</v-icon>
              </v-avatar>
              <!-- <img :src="avatarImageUrl" :alt="user.name" /> -->
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
    </v-menu>
    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>
