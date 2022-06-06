import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Homepage from '@/components/Homepage'
Vue.use(Router);
export default new Router({
    routes:[
        {
            path:'/',
            name:'Homepage',
            component:Homepage
        }
    ]
})