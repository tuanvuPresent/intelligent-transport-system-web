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

Vue.use(VeeValidate, validation);
Vue.use(Loading);
Vue.component('loading', Loading)
Vue.use(VueToast, {position: 'top-right'});
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
