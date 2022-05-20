import Vue from "vue";
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import {Pagination} from 'element-ui'
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/icon.css';
Vue.use(Pagination)

// 引入路由
import router from './router'
import '@/mock/mockSever'
// axios.defaults.baseURL = 'http://localhost:8080'
// Vue.prototype.$http = axios
// 测试接口
// import {reGetCartLIst} from './api'
// element-ui
import  {MessageBox,  Message} from 'element-ui'
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
// 引入仓库
import store from '@/store'
import 'swiper/css/bundle'
import Carousel from '@/components/Carousel'
import * as API from '@/api'
// import axios from "axios";
Vue.config.productionTip = false
// 注册全局组件
Vue.component(TypeNav.name,TypeNav);
Vue.component('Carousel',Carousel);
// Vue.component('el-pagination', Pagination);
new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  mounted() {
        // const arr = reGetCartLIst();
        // console.log(arr);
        // console.log(API);
  },
  // 配置路由
  router,
  // 配置仓库
  store,
}).$mount('#app')
