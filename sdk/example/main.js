import Vue from 'vue'
import App from './App.vue'
import Monitor from '../src'

const ins = new Monitor({
  appId: 123
})
console.log(ins)

Vue.config.errorHandler = function (err, vm, info) {
  ins.captureError(err, vm, info)
}

setTimeout(() => {
  Promise.resolve().then(() => {
    window.AudioScheduledSourceNode1()
  })
}, 3000)

new Vue({
  render: h => h(App)
}).$mount('#app')
