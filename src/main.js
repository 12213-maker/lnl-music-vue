import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import store from './store'
// import VueLazyload from 'vue-lazyload'//懒加载

//mixins全局引入
// import mixins from '@/lib/mixin'

//引入element和它的样式
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'

//导入字体图标
import './assets/fonts/iconfont.css'
// class="iconfont icon-users"使用的时候就直接加入

//引入axios并配置到原型链上
import axios from 'axios'
Vue.prototype.$http = axios

//全局事件总线的导入
Vue.prototype.$bus = new Vue()//把它挂载到vm上,大家都可以使用



Vue.config.productionTip = false//取消提示

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
