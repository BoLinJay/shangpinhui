import { method } from 'lodash'
import requests from './ajax'
import mock from './mockAjax'
// 三级联动接口
// /api/product/getBaseCategoryList   GET   无参数

export  const reqCategoryList = ()=> {

    return requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
}

export const reGetBannerList = () => {
    return mock({
        url:'/banner',
        method:'GET'
    })
}

export const reGetFloorList = ()=> {
    return mock({
        url:'/floors',
        method:'GET'
    })
}
// 获取产品详情参数
export const reGetSearchList = (params) => {
    return mock({
        url:'/list',
        method:'POST',
    })
}
// 获取产品详细信息接口
export const reGetDetailLIst = (skuID) => {
    return requests({
        url:`/item/${skuID}`,
        method:'GET'
    })
}

// export const reGetDetailLIst = () => {
//     return mock({
//         url:'/item',
//         method:'GET'
//     })
// }

// 将商品添加到购物车当中，获取更新某一个产品的个数
export const reGetShopCar = (skuId, skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
    })
}
// 获取购物车信息
export const reGetCartList = () => {
    return requests({
        url:'/cart/cartList',
        method:'GET'
    })
}
// 删除购物车
export const deleteCartList = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}
// 修改商品的选中状态
export const reviseCartList = (skuId,isChecked ) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'GET'
    })
}
// 手机验证码
export const VerificationCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}
// 注册
export const Regiister = (data) => {
    return requests({
        url:'/user/passport/register',
        data,
        method:'POST'
    })
}
// 登录
export const loginUser = (data) =>{
    return requests({
        url:'/user/passport/login',
        data,
        method:'POST'
    })
}
// 获取用户的登录信息  （携带参数token）
export const reGetUserInfo = () => {
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'GET'
    })
}
// 获取用户收件地址信息
export const reGetUserAddress= ()=> {
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'GET'
    })
}
// 10.获取订单交易页信息  /order/auth/trade
export const reGetordertrade = () => {
    return requests({
        url:'/order/auth/trade',
        method:'GET'
    })
}
// 提交订单的接口
export const reGetSubmitOrder = (tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'POST'
    })
}
// 获取支付信息
export const reGetPay = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'POST'
    })
}
// 获取我的订单列表
export const reGetMyCenter = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'GET'
    })
}
// 退出登录
export const reGetLoginOut = () => {
    return requests({
        url:'/user/passport/logout',
        method:'GET'
    })
}