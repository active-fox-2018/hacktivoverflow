import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import wysiwyg from 'vue-wysiwyg'
import 'vue-material/dist/vue-material.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './style/style.css'

Vue.use(wysiwyg, {
  maxHeight: '70vh'
})
Vue.use(VueMaterial)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
