import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.filter("minutes", function (value) {
  if (!value) return "";
  let minutes = Math.floor(value / 60000);
  let seconds = ((value % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
