import {VerificationCode,Regiister,loginUser,reGetUserInfo} from '@/api'
const actions={
    // 验证码
    async getCode(context,phone) {
        let result = await VerificationCode(phone)
        if(result.code == 200) {
            // context.commit('GETCODE',result.data)
            return result.data
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async registerUser(context,user) {
        let result = await Regiister(user)
        console.log('注册信息');
        console.log(result);
       if(result.code == 200) {
           alert('注册成功')
       } else {
           alert('注册失败，该账号已被注册')
       }
    },
    // 登录携带token
    async token(context,login) {
        let result = await loginUser(login)
        if(result.code == 200) {
            context.commit('TOKEN',result.data.token)
        } else {
            return ''
        }
    },
    // 获取用户登陆的信息
    async  getUserInfo(context,value) {
        let result = await reGetUserInfo()
        console.log('登录信息');
        console.log(result);
        if(result.code == 200) {
            context.commit('GETUSERINFO',result.data)
        }
    }
}
const mutations={
    GETCODE(state,getCode) {
        state.getCode = getCode
    },
    TOKEN(state,token) {
        state.token = token
    },
    GETUSERINFO(state,getUserInfo) {
        state.getUserInfo = getUserInfo
    }
}
const state={
    getCode:'',
    token:'',
    getUserInfo:{ }
}
const getters={}


export default {
    actions,
    mutations,
    state,
    getters
}