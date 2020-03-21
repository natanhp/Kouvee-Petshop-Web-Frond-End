import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
// import Cookie from 'vue-cookie';

// Vue.prototype.$cookie = Cookie;
Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost:1234/Kouvee/index.php';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App }
}).$mount('#app')