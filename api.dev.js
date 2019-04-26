import regeneratorRuntime from './libs/regenerator-runtime/runtime-module';
import requestUtil from './utils/request'
import exceptionUtil from './utils/exception'
import Cache from './utils/cache'
import helper from './utils/helper'

const host = 'https://demo.fashop.cn/'
const slimHost = 'http://mini.showroomv.com/';
// const host = 'http://127.0.0.1:9510/'
const api = {
    user: {
        login: {
            // url: `${host}server/user/login`,
            url: `${slimHost}server/new/user/login`,
            method: 'POST'
        },
        register: {
            // url: `${host}server/user/register`,
            url: `${slimHost}server/new/user/register`,
            method: 'POST'
        },
        logout: {
            url: `${host}server/user/logout`,
            method: 'GET'
        },
        token: {
            url: `${host}server/user/token`,
            method: 'POST'
        },
        editPassword: {
            url: `${host}server/user/editPassword`,
            method: 'POST'
        },
        findPassword: {
            url: `${host}server/user/findPassword`,
            method: 'POST'
        },
        self: {
            // url: `${host}server/user/self`,
            url: `${slimHost}server/new/user/self`,
            method: 'GET'
        },
        editPasswordByFind: {
            url: `${host}server/user/editPasswordByFind`,
            method: 'POST'
        },
        editProfile: {
            url: `${host}server/user/editProfile`,
            method: 'POST'
        },
        bindPhone: {
            url: `${host}server/user/bindPhone`,
            method: 'POST'
        },
        bindWechat: {
            url: `${host}server/user/bindWechat`,
            method: 'POST'
        },
        unbindWechat: {
            url: `${host}server/user/unbindWechat`,
            method: 'POST'
        },
        unbindPhone: {
            url: `${host}server/user/unbindWechat`,
            method: 'POST'
        },
        evaluatedList: {
            url: `${host}server/user/evaluatedList`,
            method: 'GET'
        },
        certInfo: {
            url: `${slimHost}server/new/user/certInfo`,
            method: 'GET'
        },
        editCertCode: {
            url: `${slimHost}server/new/user/editCertInfo`,
            method: 'POST'
        },
        profileInfo: {
            url: `${slimHost}server/new/user/profileInfo`,
            method: 'GET'
        },
        editProfileInfo: {
            url: `${slimHost}server/new/user/editProfileInfo`,
            method: 'POST'
        },
        addAvatar: {
            url: `${slimHost}server/new/user/addAvatar`,
            method: 'POST'
        }
    },
    buy: {
        calculate: {
            // url: `${host}server/buy/calculate`,
            url: `${slimHost}server/new/buy/calculate`,
            method: 'POST'
        },
        create:{
            // url: `${host}server/buy/create`,
            url: `${slimHost}server/new/buy/create`,
            method: 'POST'
        },
        pay:{
            url: `${host}server/buy/pay`,
            method: 'POST'
        },
    },
    cart: {
        list: {
            // url: `${host}server/cart/list`,
            url: `${slimHost}server/new/cart/list`,
            method: 'POST'
        },
        add: {
            url: `${host}server/cart/add`,
            method: 'POST'
        },
        edit: {
            // url: `${host}server/cart/edit`,
            url: `${slimHost}server/new/cart/edit`,
            method: 'POST'
        },
        del: {
            url: `${host}server/cart/del`,
            method: 'POST'
        },
        exist: {
            // url: `${host}server/cart/exist`,
            url: `${slimHost}server/new/cart/exist`,
            method: 'GET'
        },
        info: {
            url: `${host}server/cart/info`,
            method: 'GET'
        },
        check: {
            url: `${host}server/cart/check`,
            method: 'POST'
        },
        destroy: {
            url: `${host}server/cart/destroy`,
            method: 'POST'
        },
        totalNum: {
            // url: `${host}server/cart/totalNum`,
            url: `${slimHost}server/new/cart/totalNum`,
            method: 'GET'
        },
    },
    shopsCategory: {
        list: {
            url: `${slimHost}server/new/shopscategory/list`,
            method: 'GET'
        },
    },
    shops: {
        sliders: {
            url: `${slimHost}server/new/shops/sliders`,
            method: 'GET'
        },
        list: {
            url: `${slimHost}server/new/shops/list`,
            method: 'POST'
        },
        detail: {
            url: `${slimHost}server/new/shops/detail`,
            method: 'GET'
        }
    },
    goodsCategory: {
        list: {
            url: `${slimHost}server/new/goodscategory/list`,
            method: 'GET'
        },
        info:{
            url: `${host}server/goodscategory/info`,
            method: 'GET'
        }
    },
    goods: {
        list_home: {
            // url: `${host}server/goods/list`,
            url: `${slimHost}server/new/goods/list/home`,
            method: 'POST'
        },
        list: {
            // url: `${host}server/goods/list`,
            url: `${slimHost}server/new/goods/list`,
            method: 'POST'
        },
        info: {
            // url: `${host}server/goods/info`,
            url: `${slimHost}server/new/goods/info`,
            method: 'GET'
        },
    },
    goodsEvaluate: {
        list: {
            url: `${host}server/goods/evaluateList`,
            method: 'GET'
        },
        mine: {
            url: `${host}server/goodsevaluate/list`,
            method: 'GET'
        },
        add: {
            url: `${host}server/goodsevaluate/add`,
            method: 'POST'
        },
        append: {
            url: `${host}server/goodsevaluate/append`,
            method: 'POST'
        },
        info: {
            url: `${host}server/goodsevaluate/detail`,
            method: 'GET'
        },
        isEvaluated: {
            url: `${host}server/goodsevaluate/isEvaluated`,
            method: 'GET'
        },
    },
    shopsCollect: {
        mine: {
            // url: `${host}server/goodscollect/mine`,
            url: `${slimHost}server/new/shopscollect/mine`,
            method: 'GET'
        },
        add: {
            // url: `${host}server/shopscollect/add`,
            url: `${slimHost}server/new/shopscollect/add`,
            method: 'POST'
        },
        del: {
            url: `${host}server/shopscollect/del`,
            method: 'POST'
        },
    },
    goodsCollect: {
        mine: {
            // url: `${host}server/goodscollect/mine`,
            url: `${slimHost}server/new/goodscollect/mine`,
            method: 'GET'
        },
        add: {
            // url: `${host}server/goodscollect/add`,
            url: `${slimHost}server/new/goodscollect/add`,
            method: 'POST'
        },
        del: {
            url: `${host}server/goodscollect/del`,
            method: 'POST'
        },
    },
    help: {
        list: {
            url: `${slimHost}server/new/help/list`,
            method: 'GET'
        },
        info: {
            url: `${slimHost}server/new/help/info`,
            method: 'GET'
        },
        add: {
            url: `${slimHost}server/new/help/add`,
            method: 'POST'
        }
    },
    address: {
        setDefault: {
            url: `${host}server/address/setDefault`,
            method: 'POST'
        },
        getDefault: {
            // url: `${host}server/address/default`,
            url: `${slimHost}server/new/address/default`,
            method: 'GET'
        },
        list: {
            url: `${host}server/address/list`,
            method: 'GET'
        },
        info: {
            url: `${host}server/address/info`,
            method: 'GET'
        },
        add: {
            url: `${host}server/address/add`,
            method: 'POST'
        },
        edit: {
            url: `${host}server/address/edit`,
            method: 'POST'
        },
        del: {
            url: `${host}server/address/del`,
            method: 'POST'
        },
        types: {
            url: `${host}server/address/types`,
            method: 'GET'
        },
    },
    wechat: {
        buildConfig: {
            url: `${host}server/wechat/buildConfig`,
            method: 'GET'
        },
        code: {
            url: `${host}server/wechat/code`,
            method: 'GET'
        },
        userinfo: {
            url: `${host}server/wechat/userinfo`,
            method: 'GET'
        }
    },
    order: {
        stateNum: {
            url: `${host}server/order/stateNum`,
            method: 'GET'
        },
        list: {
            url: `${host}server/order/list`,
            method: 'GET'
        },
        detail: {
            url: `${host}server/order/info`,
            method: 'GET'
        },
        cancel: {
            url: `${host}server/order/cancel`,
            method: 'POST'
        },
        confirmReceipt:{
            url: `${host}server/order/confirmReceipt`,
            method: 'POST'
        },
        deliverInfo: {
            url: `${host}server/order/deliverInfo`,
            method: 'GET'
        },
        logistics: {
            url: `${host}server/order/logistics`,
            method: 'GET'
        },
        goodsList: {
            url: `${host}server/order/goodsList`,
            method: 'GET'
        },
        goodsInfo: {
            url: `${host}server/order/goodsInfo`,
            method: 'GET'
        },
    },
    refund: {
        reasonList: {
            url: `${host}server/orderrefund/reasonList`,
            method: 'GET'
        },
        apply: {
            url: `${host}server/orderrefund/apply`,
            method: 'POST'
        },
        list: {
            url: `${host}server/orderrefund/list`,
            method: 'GET'
        },
        info: {
            url: `${host}server/orderrefund/info`,
            method: 'GET'
        },
        setTrackingNo: {
            url: `${host}server/orderrefund/setTrackingNo`,
            method: 'POST'
        },
        revoke: {
            url: `${host}server/orderrefund/revoke`,
            method: 'POST'
        },
    },
    page: {
        portal:{
            // url: `${host}server/page/portal`,
            url: `${slimHost}server/new/page/portal`,
            method: 'GET'
        },
        info: {
            url: `${host}server/page/info`,
            method: 'GET'
        },
        listHomeProducts: {
            url: `${slimHost}server/new/home/goods`,
            method: 'GET'
        },
    },
    payment: {
        list: {
            url: `${host}server/payment/list`,
            method: 'GET'
        },
    },
    shop: {
        info: {
            url: `${host}server/shop/info`,
            method: 'GET'
        },
    },
    area: {
        list: {
            url: `${host}server/area/list`,
            method: 'GET'
        },
        info: {
            url: `${host}server/area/info`,
            method: 'GET'
        },
    },
    upload:{
        addImage:{
            // url: `${host}server/upload/addImage`,
            url: `${slimHost}server/new/upload/addImage`,
            method: 'POST'
        }
    },
    host
}
const request = async function (api, options = {}) {
    const body = (typeof options.data !== 'undefined') ? options.data : {}
    const cache = new Cache()
    let headers = (typeof options.header !== 'undefined') ? options.header : {}
    // const token = cache.get('user_token')
    const userInfo = cache.get('user_info')
    let serverTimeStamp = await getserverTime()
    console.log('-- get server time', serverTimeStamp.body)

    let token = helper.getSignToken(userInfo.id, serverTimeStamp.body)

    console.log('-- create token', token, typeof token)

    if (token !== null && typeof token !== 'undefined') {
        headers = Object.assign(headers, {
            'Access-Token': token
        });
    }
    const result = await requestUtil({
        url: api.url,
        method: api.method,
        type: 'json',
        body: body,
        headers: headers
    })
    
    if (result.status === 200) {
        if (result.body.code === 0) {
            return result.body
        } else {
            throw new exceptionUtil(result.body.msg, result.body.code)
        }
    } else {
        // todo log
        console.log(`请求：${api.url} ${api.url.method}：\n`)
        console.log(result)
        // todo 服务器异判断
        throw new exceptionUtil(result.statusText, result.code)
    }
}

const getserverTime = async function() {
    let serverTimeStamp = await requestUtil({
        url: 'https://os.showroomv.com/api/common/time',
        method: 'GET',
        type: 'json',
        body: '',
        headers: ''
    })

    return serverTimeStamp
}

export {
    api,
    request
}
