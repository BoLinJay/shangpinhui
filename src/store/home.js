import {reqCategoryList} from '@/api'
import {reGetBannerList} from '@/api'
import {reGetFloorList} from '@/api'
// home模块的小仓库
const actions = {
    async categoryList(context,value) {
        let result = await reqCategoryList()
        if(result.code === 200) {
            context.commit('CATEGORYLIST',result.data)
        }
        // console.log(result);
    },
    async bannerList(context,value) {
        let resultMock = await reGetBannerList()
        // console.log(resultMock);
        if(resultMock.code === 200) {
            context.commit('BANNERLIST',resultMock.data)
        }
    },
    async floorList(context,value) {
         let result = await reGetFloorList()
         if(result.code === 200) {
             context.commit('FLOORLIST', result.data)
         }
    }
   
};
const mutations = {
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
        // console.log( state.categoryList);
    },
    BANNERLIST(state,bannerList) {
        state.bannerList = bannerList
        // console.log(state.bannerList);
    },
    FLOORLIST(state,floorList) {
        state.floorList = floorList
        // console.log(state.floorList);
    }
};
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}