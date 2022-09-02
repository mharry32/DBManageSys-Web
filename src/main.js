import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';

axios.defaults.withCredentials = true;

//全局请求拦截器
axios.interceptors.request.use(config => {
  // JWT认证
  let token = localStorage.getItem('TOKEN')
  config.headers.Authorization = 'Bearer ' + token
  return config
}, err => {
  // console.log(err);
})

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
