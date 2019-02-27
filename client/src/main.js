import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/quasar.styl'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import Quasar from 'quasar'

Vue.use(Quasar, {
  config: {
    brand: {
      primary: '#253a4d'
    }
  },
  iconSet: iconSet
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
