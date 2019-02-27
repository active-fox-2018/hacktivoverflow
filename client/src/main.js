import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from 'vue-wysiwyg'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(wysiwyg, {iconfont: 'fa'}) // config is optional. more below
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
