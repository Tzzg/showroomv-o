import fa from '../../../utils/fa'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

Page({
    data: {
        userInfo: null,
        address:{
            name:'',
            phone:'',
            address:''
        },
    },
    async onShow() {
        const userInfo = fa.cache.get('user_info')
        const userInfoWechat = fa.cache.get('user_info_wechat')
        this.setData({
            loginState: fa.getLoginState(userInfo),
            userInfo: userInfo,
            userInfoWechat: userInfoWechat
        })
    },
    logout(){
        fa.cache.set('user_info',null)
        fa.cache.set('user_token',null)
        wx.switchTab({
            url: '/pages/user/index'
        })
    }
})
