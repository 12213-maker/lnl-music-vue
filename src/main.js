import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//mixins全局引入
// import mixins from '@/lib/mixin'

//引入全局样式表
import './assets/css/global.css'

//引入element和它的样式
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'

//引入图标样式
import './assets/font/iconfont'

import {request} from './network/request'
Vue.prototype.$request = request

//全局事件总线的导入
Vue.prototype.$bus = new Vue()//通过一个空的Vue实例作为全局事件总线($emit/$on)

Vue.config.productionTip = false//取消提示

new Vue({
  router,
  store,
  render: h => h(App)//渲染一个视图,然后提供给el挂载
}).$mount('#app')
