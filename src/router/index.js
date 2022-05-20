// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router'
import store from '@/store'
// 使用插件
Vue.use(VueRouter);
import router from './router'
import { toPairs } from 'lodash';
// 重复点击导航时，控制台出现报错 解决办法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// 路由守卫
router.beforeEach((to,from,next)=> {
    next()
    // console.log(store);
    let token = store.state.user.token
    if(token) {
      if(to.path == '/login') {
        next('/')
      } else {
        next()
      }
    } else {
      if(to.path == '/center' || to.path == '/pay' || to.path == '/paySuccess' || to.path == '/shopcart' || to.path == '/trade' || to.name == 'Carts') {
        next(`/login?regirect=${to.path}`);
      } else {
        next()
      }
      }
      
})

export default router