// search模块的小仓库
import {reGetSearchList} from '@/api'
const actions = {
    async searchList(context,value) {
        let result = await reGetSearchList() 
        // console.log(result);s
            if(result.code === 200) {
                context.commit('SEARCHLIST', result.data)
        }
    }
};
const mutations = {
    SEARCHLIST(state,searchList) {
    state.searchList = searchList
    // console.log(state.searchList);
    }
};
const state = {
    searchList:{}
};
const getters = {
    goodsList(state) {
        return state.searchList.data.goodsList || {}
    },
    attrsList(state) {
        return state.searchList.data.attrsList || {}
    },
    trademarkList(state) {
        return state.searchList.data.trademarkList || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}