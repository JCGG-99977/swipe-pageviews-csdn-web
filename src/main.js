import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {get,put,del,post} from './http'
// 定义请求的全局方法
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$del = del
Vue.prototype.$put = put
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
