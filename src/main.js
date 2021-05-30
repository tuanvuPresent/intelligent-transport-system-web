import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './stores'
import router from "./routers";
import VueCompositionApi from "@vue/composition-api";
import VueCookies from 'vue-cookies'
import VeeValidate from 'vee-validate';
import VueToast from "vue-toast-notification";
import validation from './validation/vee-validate'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@/assets/style/styles.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import NotificationDialog from './components/dialog/NotificationDialog';
 
Vue.use(VeeValidate, validation);
Vue.use(Loading);
Vue.component('loading', Loading)
Vue.use(VueToast, {position: 'top-right'});
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    libraries: 'places'
  }}
)
Vue.component('NotificationDialog', NotificationDialog)

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
