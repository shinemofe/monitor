import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'tcon'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
