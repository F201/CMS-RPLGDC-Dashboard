import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueCropper from 'vue-cropperjs';
import "./plugins/vee-validate";
import 'cropperjs/dist/cropper.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { registerMiddleware } from './router/middleware';

const options = {
  confirmButtonColor: '#fc6e20',
};

Vue.use(VueSweetalert2, options);
Vue.component('vuew-VueCropper');
Vue.config.productionTip = false;

registerMiddleware(router, store);

new Vue({
  router,
  VueCropper,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
