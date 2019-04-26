import fa from "../../../utils/fa";
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import CartModel from "../../../models/cart";
import BuyModel from "../../../models/buy";
import AddressModel from "../../../models/address";
import UserModel from "../../../models/user";

const cartModel = new CartModel()
const buyModel = new BuyModel()
const addressModel = new AddressModel()
const userModel = new UserModel()

const WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        delta: 1,
        way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
        calculate: null,
        cartList: [],
        cartIds: [],
        addressId: [],
        address: {},
        message: null,
        payState: false,
        total: 0,
        hasMask: false,
        userPolicy: '',
        userPolicyAgree: false
    },
    onMessageChange(e) {
        this.setData({
            message: e.detail.value
        })
    },
    goAddressAdd() {
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    },
    goAddressList() {
        wx.navigateTo({
            url: '/pages/address/list/index'
        })
    },
    async onLoad(options) {
        let cachedUserPolicy = fa.cache.get('user_policy')

        if (cachedUserPolicy != null && cachedUserPolicy != undefined) {
            this.setData({
                userPolicyAgree: cachedUserPolicy
            })
        }
        console.log(options)
            // 清空被选中，为了带过来列表返回的
        fa.cache.set('address_checked_id', null)
        let cartIds = JSON.parse(options.cart_ids);
        this.setData({
            cartIds
        })
        let way = 'cart'
        let delta = this.data.delta
        if (typeof options['way'] !== 'undefined' && options['way'] === 'buy_now') {
            way = 'buy_now'
            delta = 1
        } else {
            delta = 2
        }
        console.log(way)
        this.setData({
            cartIds,
            way,
            delta
        })
    },
    // 计算费用
    async initCalculate() {
        const cartIds = this.data.cartIds
        const calculate = await buyModel.calculate({
            cart_ids: cartIds,
            address_id: this.data.addressId
        })
        if (calculate) {
            this.setData({
                calculate
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(buyModel.getException().getCode())
            })
        }
    },
    // 获得默认地址
    async initAddress(e) {
        let address = []
        if (this.data.addressId > 0) {
            address = await addressModel.info({
                id: this.data.addressId
            })
        } else {
            address = await addressModel.getDefault()
        }
        if (address) {
            this.setData({
                addressId: address.id,
                address
            })
            return address
        } else {
            return false
        }
    },
    async onShow() {
        const payState = this.data.payState
        if (payState === false) {
            const addressId = fa.cache.get('address_checked_id')
            if (addressId > 0) {
                this.setData({ addressId })
            }
            const cartListState = await this.initCartList()
            if (cartListState === true) {
                const address = await this.initAddress()
                if (address.id > 0) {
                    await this.initCalculate()
                }
            } else {
                fa.toast.show({
                    title: '支付商品状态已变，请重新选择'
                })
                setTimeout(function() {
                    wx.navigateBack({ delta: this.data.delta })
                }, 1500)
            }
        }

    },
    async initCartList() {
        const cartIds = this.data.cartIds
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        let total = 0
        const result = await cartModel.list({
            ids: cartIds
        })
        if (result.list.length > 0) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {
                total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function(item) {
                    return `${item.name}:${item.value_name}`
                })
            }
            this.setData({
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                cartList,
                total
            })
            return true
        } else {
            return false
        }
    },
    tapPolicyCloseBtn() {
        this.setData({
            userPolicyAgree: false,
            hasMask: false
        })
    },
    async tapAgreeBtn() {
        const userInfo = fa.cache.get('user_info')
        const userResult = await userModel.sendUserPolicy({
            'user_id': userInfo.id
        })
      console.log(userResult);
        if (userResult.agree_policy) {
            this.setData({
                userPolicyAgree: true,
                hasMask: false
            })

            fa.cache.set('user_policy', true)
        }
    },
    async onCreateOrder(e) {
        if (!this.data.userPolicyAgree) {
            fa.cache.set('user_policy', false)
            this.setData({ hasMask: true })

            let policy = '<h1>今日头条用户协议</h1> <h4>1、导言</h4> <p>欢迎你使用“今日头条”软件及相关服务！</p> <p>“今日头条”软件及相关服务，系指公司通过合法拥有并运营的、标注名称为“今日头条”的客户端应用程序以及“头条网”（toutiao.com）的网站，向你提供的产品与服务，包括但不限于个性化推荐、发布信息、互动交流、搜索查询等核心功能以及其他功能，为创作与交流的平台。《今日头条用户协议》（以下简称“本协议”）是你与公司之间就你注册、登录、使用（以下统称“使用”）“今日头条”软件及相关服务所订立的协议。</p>'
            let that = this

            WxParse.wxParse('userPolicy', 'html', policy, that, 25)

            return
        }

        console.log('formId', e.detail)
        const self = this
        if (!this.data.addressId) {
            fa.toast.show({
                title: '请选择收货地址'
            })
            return
        }
        const result = await buyModel.create({
            'way': this.data.way,
            'address_id': this.data.addressId,
            'cart_ids': this.data.cartIds,
            'message': this.data.message,
            'form_id': e.detail.formId
        })
        const userInfo = fa.cache.get('user_info')
        if (result) {
            // 支付modal也算onShow 这儿临时限制下
            this.setData({
                payState: true
            })
            const pay_amount = this.data.calculate.pay_amount
                // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
            const payResult = await buyModel.pay({
                'order_type': 'goods_buy',
                'pay_sn': result.pay_sn,
                'payment_code': 'wechat',
                'payment_channel': 'wechat_mini',
                'openid': userInfo.wechat_mini_openid
            })
            if (payResult) {
                wx.requestPayment({
                    'timeStamp': payResult.timeStamp,
                    'nonceStr': payResult.nonceStr,
                    'package': payResult.package,
                    'signType': payResult.signType,
                    'paySign': payResult.paySign,
                    'success': function() {
                        wx.redirectTo({
                            url: `/pages/pay/result/index?pay_amount=${pay_amount}&order_id=${result.order_id}&pay_sn=${result.pay_sn}`
                        })
                    },
                    'fail': function(res) {
                        fa.toast.show({
                            title: '支付被取消'
                        })
                        setTimeout(function() {
                            wx.redirectTo({
                                url: `/pages/order/detail/index?id=${result.order_id}`
                            })
                        }, 1000)
                    }
                })
            } else {
                fa.toast.show({
                    title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
                })
                wx.navigateBack({ delta: self.data.delta })
            }
        } else {
            fa.toast.show({
                title: +fa.code.parse(buyModel.getException().getCode())
            })
        }

    }
})