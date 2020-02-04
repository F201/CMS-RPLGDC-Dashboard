import '@mdi/font/css/materialdesignicons.css'
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary: '#fc6e20'
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        // error: '#b71c1c',
      },
    },
  },
});
