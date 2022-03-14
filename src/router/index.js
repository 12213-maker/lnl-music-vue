import routes from './routes'
import VueRouter from 'vue-router'
import Vue from 'vue'

//使用插件
Vue.use(VueRouter)


const router =  new VueRouter({
    routes
})

//这里还要设置路由守卫


export default router