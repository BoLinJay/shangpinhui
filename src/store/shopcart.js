import {reGetCartList,deleteCartList,reviseCartList} from '@/api'
const actions={
    // 删除所有选中的商品
    deleteAllList({dispatch, getters}) {
        let PromiseAll=[]
        getters.cartInfoList.forEach(element => {
            const Promise = element.isChecked == 1 ? dispatch('deleteCart',element.skuId) : ''
            PromiseAll.push(Promise)
        });
        return Promise.all(PromiseAll)
    },
    // 获取购物数据
    async cartList(context, value) {
        let result = await reGetCartList()
        // console.log(result);
        if(result.code == 200) {
            context.commit('CARTLIST',result.data)
        }
    },
    // 删除购物车数据
    async deleteCart(context, skuId) {
        await deleteCartList(skuId)
    },
    // 修改购物车选中状态
    async reviseList(context, {skuId,isChecked}){
        let result = await reviseCartList(skuId,isChecked)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    
}
const mutations={
    CARTLIST(state, cartList) {
        state.cartList = cartList
    } 
}
const state = {
    cartList: {}
}
const getters = {
    cartInfoList() {
        return state.cartList[0].cartInfoList||{};  
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}