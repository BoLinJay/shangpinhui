import {reGetUserAddress,reGetordertrade} from '@/api'
const actions={
    // 收货地址
    async userAddress(context,value) {
        let result = await reGetUserAddress()
        console.log('收货地址');
        console.log(result);
        if(result.code == 200) {
            context.commit('USERADDRESS',result.data)
        }
    },
    // 10.获取订单交易页信息
    async userGetOrder(context,value) {
        let result = await reGetordertrade()
        console.log('订单详情页信息');
        console.log(result);
        if(result.code == 200) {
            context.commit('USERGETORDER',result.data)
        }
    }
}
const mutations={
    USERADDRESS(state,userAddress) {
        state.userAddress = userAddress
    },
    USERGETORDER(state,userGetOrder) {
        state.userGetOrder = userGetOrder
    }
}
const state={
    userAddress:[],
    userGetOrder:{}
}
const getter={}
export default {
    actions,
    mutations,
    state,
    getter
}