import Vue from 'vue';
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 引入路由
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 配置模块
// 路由懒加载
export default new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta: { show: true }
            
        },
        {
            name:'Search',
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta: { show: true },
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login'),
            meta: { show: false }
        },
        {
            path:'/register',
            component:()=>import('@/pages/Register'),
            meta: { show: false }
        },
        {
            name:'Detail',
            path:'/detail/:id',
            component:()=>import('@/pages/Detail'),
            meta: { show: true }
        },
        {
            name:'Carts',
            path:'/crts/:skuNum?',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{show: true}
        },
        {
            name:'ShopCart',
            path:'/shopcart',
            component:()=>import('@/pages/ShopCart'),
            meta:{show: true}
        },
        {
            name:'Trade',
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{show:true}
        },
        {
            name:'Pay',
            path:'/pay/orderId=:orderId?',
            component:()=>import('@/pages/Pay'),
            meta:{show:true}
        },
        {
            name:'PaySuccess',
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true}
        },
        {
            name:'Center',
            path:'/center',
            component:()=>import('@/pages/Center'),
            meta:{show:false}
        }
        
      
        
    ],
    scrollBehavior(to, from, savedPosition) {
        return {y: 0}
      },
})
