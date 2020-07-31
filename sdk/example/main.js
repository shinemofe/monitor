import Vue from 'vue'
import App from './App.vue'
import Monitor from '../src'
// import fundebug from 'fundebug-javascript'
// fundebug.apikey = '0490941044dc8f2b1fed1965b715f0f86faf2df1eb99c1a14c0847849dc01e54'

const ins = new Monitor({
  appId: 123
})
// console.log(ins)

Vue.config.errorHandler = function (err, vm, info) {
  ins.captureError(err, vm, info)
}

const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://youl.uban360.com/gift-front/user/me1?siteId=1')
xhr.send()

// setTimeout(() => {
//   Promise.resolve().then(() => {
//     window.AudioScheduledSourceNode1()
//   })
// }, 3000)

new Vue({
  render: h => h(App)
}).$mount('#app')
