import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import qs from 'qs'

Vue.prototype.$http = Axios;
Vue.prototype.$qs = qs
Vue.prototype.$store = store;
Vue.prototype.$apiUrl = 'http://localhost:8000/api/v1/'
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
  console.log(token)
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  components: { App }
}).$mount('#app')