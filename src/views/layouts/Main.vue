<template>
  <v-layout>
    <left-navbar/>
    <top-navbar/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <footer-bar/>
  </v-layout>
</template>
<script>
import LeftNavbar from './LeftNavbar';
import TopNavbar from './TopNavbar';
import FooterBar from './FooterBar';

export default {
  components: {
    LeftNavbar,
    TopNavbar,
    FooterBar,
  },
  data: () => ({
  }),
};
</script>
