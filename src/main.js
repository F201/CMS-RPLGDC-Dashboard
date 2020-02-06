import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";


import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component('vue-cropper',VueCropper);

Vue.config.productionTip = false;

new Vue({
  router,
  VueCropper,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
