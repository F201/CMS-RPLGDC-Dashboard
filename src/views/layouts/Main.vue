<template>
  <v-layout>
    <left-navbar/>
    <v-content>
      <top-navbar/>
      <v-container>
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
