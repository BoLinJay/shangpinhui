import {reGetDetailLIst,reGetShopCar} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const actions={
// 产品信息
    async detailList(context, id) {
     let result = await reGetDetailLIst(id)
        // console.log(result);
        if (result.code === 200) {
            context.commit('DETAILLIST', result.data)
        }
    },
// 产品信息添加到购物车中 || 修改产品数量
    async addShopCarts(context, {skuId, skuNum}) {
        let result = await reGetShopCar(skuId, skuNum)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
    
const mutations={
    DETAILLIST(state, detailList) {
        state.detailList = detailList
        // console.log(state.detailList); 
    },
   
}
const state={
    detailList:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const getters={
    categoryView(state){
        return state.detailList.categoryView||{}
    },
    skuInfo() {
        return (state.detailList.skuInfo || {})
    },
    spuSaleAttrList() {
        return state.detailList.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}