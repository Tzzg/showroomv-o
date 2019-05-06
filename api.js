import regeneratorRuntime from './libs/regenerator-runtime/runtime-module';
import requestUtil from './utils/request'
import exceptionUtil from './utils/exception'
import Cache from './utils/cache'
import helper from './utils/helper'

// import LoginLogic from './logics/login'
// const loginLogic = new LoginLogic()

// const host = 'https://demo.fashop.cn/'
// const slimHost = 'http://mini.showroomv.com/';
// const host = 'http://127.0.0.1:9510/ '

const svHost = 'https://os.showroomv.com/'
const v1 = 'server_o/'
const api = {
  user: {
    checkStatus: {
      // url: `${host}server/user/register`,
      url: `${svHost}${v1}user/info/check_status`,
      method: 'POST'
    },
    policy: {
      // url: `${host}server/user/register`,
      url: `${svHost}${v1}user/info/policy`,
      method: 'POST'
    },
    login: {
      // url: `${host}server/user/login`,
      // url: `${slimHost}server/new/user/login`,
      url: `${svHost}${v1}user/login`,
      method: 'POST'
    },
    register: {
      // url: `${host}server/user/register`,
      // url: `${slimHost}server/new/user/register`,
      url: `${svHost}${v1}user/info/register`,
      method: 'POST'
    },
    logout: {
      // url: `${host}server/user/logout`,
      url: `${svHost}${v1}user/info/logout`,
      method: 'GET'
    },
    token: {
      // url: `${host}server/user/token`,
      url: `${svHost}${v1}user/info/accesstoken`,
      method: 'POST'
    },
    editPassword: {
      // url: `${host}server/user/editPassword`,
      url: `${svHost}${v1}user/info/editPassword`,
      method: 'POST'
    },
    findPassword: {
      // url: `${host}server/user/findPassword`,
      url: `${svHost}${v1}user/info/findPassword`,
      method: 'POST'
    },
    self: {
      // url: `${host}server/user/self`,
      // url: `${slimHost}server/new/user/self`,
      url: `${svHost}${v1}user/info/selfs`,
      method: 'GET'
    },
    editPasswordByFind: {
      // url: `${host}server/user/editPasswordByFind`,
      url: `${svHost}${v1}user/info/editPasswordByFind`,
      method: 'POST'
    },
    editProfile: {
      // url: `${host}server/user/editProfile`,
      url: `${svHost}${v1}user/info/editProfile`,
      method: 'POST'
    },
    bindPhone: {
      // url: `${host}server/user/bindPhone`,
      url: `${svHost}${v1}user/info/bindPhone`,
      method: 'POST'
    },
    bindWechat: {
      // url: `${host}server/user/bindWechat`,
      url: `${svHost}${v1}user/info/bindWechat`,
      method: 'POST'
    },
    unbindWechat: {
      // url: `${host}server/user/unbindWechat`,
      url: `${svHost}${v1}user/info/unbindWechat`,
      method: 'POST'
    },
    unbindPhone: {
      // url: `${host}server/user/unbindWechat`,
      url: `${svHost}${v1}user/info/unbindWechat`,
      method: 'POST'
    },
    evaluatedList: {
      // url: `${host}server/user/evaluatedList`,
      url: `${svHost}${v1}user/info/evaluatedList`,
      method: 'GET'
    },
    certInfo: {
      // url: `${slimHost}server/new/user/certInfo`,
      url: `${svHost}${v1}user/info/cert`,
      method: 'GET'
    },
    editCertCode: {
      // url: `${slimHost}server/new/user/editCertInfo`,
      url: `${svHost}${v1}user/info/cert_edit`,
      method: 'POST'
    },
    profileInfo: {
      // url: `${slimHost}server/new/user/profileInfo`,
      url: `${svHost}${v1}user/info/profile`,
      method: 'GET'
    },
    editProfileInfo: {
      // url: `${slimHost}server/new/user/editProfileInfo`,
      url: `${svHost}${v1}user/info/profile_edit`,
      method: 'POST'
    },
    addAvatar: {
      // url: `${slimHost}server/new/user/addAvatar`,
      url: `${svHost}${v1}user/info/addAvatar`,
      method: 'POST'
    }
  },
  buy: {
    calculate: {
      // url: `${host}server/buy/calculate`,
      // url: `${slimHost}server/new/buy/calculate`,
      url: `${svHost}${v1}cart/calculate`,
      method: 'POST'
    },
    create: {
      // url: `${host}server/buy/create`,
      //url: `${slimHost}server/new/buy/create`,
      url: `${svHost}${v1}user/order/create`,
      method: 'POST'
    },
    pay: {
      // url: `${host}server/buy/pay`,
      url: `${svHost}${v1}pay/payorder`,
      method: 'POST'
    },
  },
  cart: {
    list: {
      // url: `${host}server/cart/list`,
      // url: `${slimHost}server/new/cart/list`,
      url: `${svHost}${v1}cart/lists`,
      method: 'POST'
    },
    add: {
      // url: `${host}server/cart/add`,
      url: `${svHost}${v1}cart/add`,
      method: 'POST'
    },
    edit: {
      // url: `${host}server/cart/edit`,
      // url: `${slimHost}server/new/cart/edit`,
      url: `${svHost}${v1}cart/edit`,
      method: 'POST'
    },
    del: {
      // url: `${host}server/cart/del`,
      url: `${svHost}${v1}cart/del`,
      method: 'POST'
    },
    exist: {
      // url: `${host}server/cart/exist`,
      // url: `${slimHost}server/new/cart/exist`,
      url: `${svHost}${v1}cart/exist`,
      method: 'GET'
    },
    info: {
      // url: `${host}server/cart/info`,
      url: `${svHost}${v1}cart/info`,
      method: 'GET'
    },
    check: {
      // url: `${host}server/cart/check`,
      url: `${svHost}${v1}cart/check`,
      method: 'POST'
    },
    destroy: {
      // url: `${host}server/cart/destroy`,
      url: `${svHost}${v1}cart/destroy`,
      method: 'POST'
    },
    totalNum: {
      // url: `${host}server/cart/totalNum`,
      url: `${svHost}${v1}cart/totalnum`,
      method: 'GET'
    },
  },
  shopsCategory: {
    list: {
      //url: `${slimHost}server/new/shopscategory/list`,
      url: `${svHost}${v1}shops/categories`,
      method: 'GET'
    },
  },
  shops: {
    sliders: {
      // url: `${slimHost}server/new/shops/sliders`,
      url: `${svHost}${v1}shops/sliders`,
      method: 'GET'
    },
    list: {
      // url: `${slimHost}server/new/shops/list`,
      url: `${svHost}${v1}shops/lists`,
      method: 'POST'
    },
    detail: {
      // url: `${slimHost}server/new/shops/detail`,
      url: `${svHost}${v1}shops/detail`,
      method: 'GET'
    }
  },
  goodsCategory: {
    list: {
      // url: `${slimHost}server/new/goodscategory/list`,
      url: `${svHost}${v1}goods/categories`,
      method: 'GET'
    },
    info: {
      // url: `${host}server/goodscategory/info`,
      url: `${svHost}${v1}goods/categoriesinfo`,
      method: 'GET'
    }
  },
  goods: {
    list_home: {
      // url: `${host}server/goods/list`,
      // url: `${slimHost}server/new/goods/list/home`,
      url: `${svHost}${v1}goods/lists`,

      method: 'POST'
    },
    list: {
      // url: `${host}server/goods/list`,
      // url: `${slimHost}server/new/goods/list`,
      url: `${svHost}${v1}goods/lists`,
      method: 'POST'
    },
    info: {
      // url: `${host}server/goods/info`,
      // url: `${slimHost}server/new/goods/info`,
      url: `${svHost}${v1}goods/info`,
      method: 'GET'
    },
  },
  goodsEvaluate: {
    list: {
      // url: `${host}server/goods/evaluateList`,
      url: `${svHost}${v1}evaluate/lists`,
      method: 'GET'
    },
    mine: {
      // url: `${host}server/goodsevaluate/list`,
      url: `${svHost}${v1}evaluate/mine`,
      method: 'GET'
    },
    add: {
      // url: `${host}server/goodsevaluate/add`,
      url: `${svHost}${v1}evaluate/add`,
      method: 'POST'
    },
    append: {
      // url: `${host}server/goodsevaluate/append`,
      url: `${svHost}${v1}evaluate/append`,
      method: 'POST'
    },
    info: {
      // url: `${host}server/goodsevaluate/detail`,
      url: `${svHost}${v1}evaluate/info`,
      method: 'GET'
    },
    isEvaluated: {
      // url: `${host}server/goodsevaluate/isEvaluated`,
      url: `${svHost}${v1}evaluate/isEvaluated`,
      method: 'GET'
    },
  },
  shopsCollect: {
    mine: {
      // url: `${host}server/goodscollect/mine`,
      // url: `${slimHost}server/new/shopscollect/mine`,
      url: `${svHost}${v1}user/collect/shops`,
      method: 'GET'
    },
    add: {
      // url: `${host}server/shopscollect/add`,
      url: `${svHost}${v1}user/collect/addshop`,
      method: 'POST'
    },
    del: {
      // url: `${host}server/shopscollect/del`,
      url: `${svHost}${v1}user/collect/delshop`,
      method: 'POST'
    },
  },
  goodsCollect: {
    mine: {
      // url: `${host}server/goodscollect/mine`,
      url: `${svHost}${v1}user/collect/goods`,
      method: 'GET'
    },
    add: {
      // url: `${host}server/goodscollect/add`,
      url: `${svHost}${v1}user/collect/addgood`,
      method: 'POST'
    },
    del: {
      // url: `${host}server/goodscollect/del`,
      url: `${svHost}${v1}user/collect/delgood`,
      method: 'POST'
    },
  },
  help: {
    list: {
      // url: `${host}server/help/list`,
      // url: `${slimHost}server/new/help/lists`,
      url: `${svHost}${v1}help/list`,
      method: 'GET'
    },
    info: {
      // url: `${slimHost}server/new/help/info`,
      url: `${svHost}${v1}help/info`,
      method: 'GET'
    },
    add: {
      // url: `${slimHost}server/new/help/add`,
      url: `${svHost}${v1}help/feedback`,
      method: 'POST'
    }
  },
  address: {
    setDefault: {
      // url: `${host}server/address/setDefault`,
      url: `${svHost}${v1}user/address/setDefault`,
      method: 'POST'
    },
    getDefault: {
      // url: `${host}server/address/default`,
      url: `${svHost}${v1}user/address/getdefault`,
      method: 'GET'
    },
    list: {
      // url: `${host}server/address/list`,
      url: `${svHost}${v1}user/address/lists`,
      method: 'GET'
    },
    info: {
      // url: `${host}server/address/info`,
      url: `${svHost}${v1}user/address/info`,
      method: 'GET'
    },
    add: {
      // url: `${host}server/address/add`,
      url: `${svHost}${v1}user/address/add`,
      method: 'POST'
    },
    edit: {
      // url: `${host}server/address/edit`,
      url: `${svHost}${v1}user/address/edit`,
      method: 'POST'
    },
    del: {
      // url: `${host}server/address/del`,
      url: `${svHost}${v1}user/address/del`,
      method: 'POST'
    },
    types: {
      // url: `${host}server/address/types`,
      url: `${svHost}${v1}user/address/types`,
      method: 'GET'
    },
  },
  wechat: {
    buildConfig: {
      // url: `${host}server/wechat/buildConfig`,
      url: `${svHost}${v1}wechat/buildConfig`,
      method: 'GET'
    },
    code: {
      // url: `${host}server/wechat/code`,
      url: `${svHost}${v1}wechat/code`,
      method: 'GET'
    },
    userinfo: {
      // url: `${host}server/wechat/userinfo`,
      url: `${svHost}${v1}wechat/userinfo`,
      method: 'GET'
    },
  },
  order: {
    stateNum: {
      // url: `${host}server/order/stateNum`,
      url: `${svHost}${v1}user/order/statenum`,
      method: 'GET'
    },
    list: {
      //url: `${host}server/order/list`,
      url: `${svHost}${v1}user/order/lists`,
      method: 'GET'
    },
    detail: {
      // url: `${host}server/order/info`,
      url: `${svHost}${v1}user/order/info`,
      method: 'GET'
    },
    cancel: {
      // url: `${host}server/order/cancel`,
      url: `${svHost}${v1}user/order/cancel`,
      method: 'POST'
    },
    confirmReceipt: {
      // url: `${host}server/order/confirmReceipt`,
      url: `${svHost}${v1}user/order/confirmReceipt`,
      method: 'POST'
    },
    deliverInfo: {
      // url: `${host}server/order/deliverInfo`,
      url: `${svHost}${v1}user/order/deliverInfo`,
      method: 'GET'
    },
    logistics: {
      //url: `${host}server/order/logistics`,
      url: `${svHost}${v1}/user/order/logistics`,
      method: 'GET'
    },
    goodsList: {
      // url: `${host}server/order/goodsList`,
      url: `${svHost}${v1}user/order/goodsList`,
      method: 'GET'
    },
    goodsInfo: {
      // url: `${host}server/order/goodsInfo`,
      url: `${svHost}${v1}user/order/goodsinfo`,
      method: 'GET'
    },
  },
  refund: {
    reasonList: {
      // url: `${host}server/orderrefund/reasonList`,
      url: `${svHost}${v1}user/refund/reasonList`,

      method: 'GET'
    },
    apply: {
      // url: `${host}server/orderrefund/apply`,
      url: `${svHost}${v1}user/refund/apply`,
      method: 'POST'
    },
    list: {
      // url: `${host}server/orderrefund/list`,
      url: `${svHost}${v1}user/refund/lists`,
      method: 'GET'
    },
    info: {
      // url: `${host}server/orderrefund/info`,
      url: `${svHost}${v1}user/refund/info`,
      method: 'GET'
    },
    setTrackingNo: {
      // url: `${host}server/orderrefund/setTrackingNo`,
      url: `${svHost}${v1}user/refund/setTrackingNo`,
      method: 'POST'
    },
    revoke: {
      // url: `${host}server/orderrefund/revoke`,
      url: `${svHost}${v1}user/refund/revoke`,
      method: 'POST'
    },
  },
  page: {
    portal: {
      // url: `${host}server/page/portal`,
      // url: `${slimHost}server/new/page/portal`,
      url: `${svHost}${v1}homepage/portal`,
      method: 'GET'
    },
    info: {
      // url: `${host}server/page/info`,
      url: `${svHost}${v1}homepage/info`,
      method: 'GET'
    },
    listHomeProducts: {
      // url: `${slimHost}server/new/home/goods`,
      url: `${svHost}${v1}homepage/goods`,
      method: 'GET'
    },
  },
  payment: {
    list: {
      // url: `${host}server/payment/list`,
      url: `${svHost}${v1}pay/lists`,
      method: 'GET'
    },
  },
  shop: {
    info: {
      //  url: `${host}server/shop/info`,
      url: `${svHost}${v1}shops/info`,
      method: 'GET'
    },
  },
  area: {
    list: {
      // url: `${host}server/area/list`,
      url: `${svHost}${v1}homepage/areas`,
      method: 'GET'
    },
    info: {
      //url: `${host}server/area/info`,
      url: `${svHost}${v1}homepage/areas_info`,
      method: 'GET'
    },
  },
  upload: {
    addImage: {
      // url: `${host}server/upload/addImage`,
      url: `${svHost}${v1}file/upload`,
      method: 'POST'
    }
  },
  svHost
}
const request = async function (api, options = {}) {
  const slefToken = (typeof options.selfToken !== 'undefined') ? options.selfToken : {}
  const body = (typeof options.data !== 'undefined') ? options.data : {}
  const cache = new Cache()
  let headers = (typeof options.header !== 'undefined') ? options.header : {}
  // const token = cache.get('user_token')
  const userInfo = cache.get('user_info')
  let serverTimeStamp = await getserverTime()

  // if (typeof userInfo.id == 'undefined') {
  //   await loginLogic.wechatLogin(false)
  // }

  let token = helper.getSignToken(userInfo.id, serverTimeStamp.body)

  if (token !== null && typeof token !== 'undefined') {
    headers = Object.assign(headers, {
      'Sv-Access-Token': token,
      'Sv-Access-UT': userInfo.id + '/' + serverTimeStamp.body,
    });
  }
  if (slefToken !== null && typeof slefToken.access_token !== 'undefined') {
    headers = Object.assign(headers, {
      'Access-Token': slefToken.access_token
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

const getserverTime = async function () {
  let serverTimeStamp = await requestUtil({
    url: svHost + '/api/common/time',
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