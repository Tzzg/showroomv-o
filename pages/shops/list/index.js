import ShopsCategoryModel from "../../../models/shopsCategory";
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
// import fa from "../../../utils/fa";
// import { inherits } from "util";
import ShopsModel from '../../../models/shops'
// import GoodsModel from "../../models/goods";
import { api, request } from '../../../api';

const shopsCategoryModel = new ShopsCategoryModel()
const shopsModel = new ShopsModel()

Page({
  data: {
    banners: {
        options: {layout_style: 1},
        data: [
            {img:{url: 'https://cn.bing.com/th?id=OHR.LeopardNamibia_ZH-CN9585068449_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
            {img:{url: 'https://cn.bing.com/th?id=OHR.SeptimiusSeverus_ZH-CN0799811992_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
            {img:{url: 'https://cn.bing.com/th?id=OHR.AgriculturalPi_ZH-CN9754138523_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
        ],
    },
    shops: {
      page: 1,
      rows: 10,
      noMore: false,
      list: [],
      style: 3,
      categoryList: null,
      smallImageWidth: 0,
      categoryId: null,
      categoryClickIndex: -1
    },
    shopsCateClick: false
  },
  onLoad() {
    wx.showShareMenu({
        withShareTicket: true
    })
    this.style3GetGoodsList()
    this.init()
  },
  async init () {
    const systemInfo = wx.getSystemInfoSync()
    const shopCategoryListResult3 = await shopsCategoryModel.list()
    const shopCategoryList3 = shopCategoryListResult3.list

    const shopIndexSlider = await request(api.shops.sliders, {})

    console.log('hai----')
    console.log(shopIndexSlider.result.sliders)

    this.setData({
        'shops.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
        'shops.categoryList': shopCategoryList3,

        banners: {
          options: {layout_style: 1},
          data: shopIndexSlider.result.sliders
        }
    })
    this.style3GetGoodsList()
  },
  style3CategoryClick(e) {
    this.setData({
        'shops.page': 1,
        'shops.categoryId': e.currentTarget.dataset.categoryId,
        'shops.categoryClickIndex': parseInt(e.currentTarget.dataset.index),
        'shopsCateClick': true
    })
    this.style3GetGoodsList()

    console.log('hello?')
  },
  onLoginSuccess() {
      this.setData({
          userInfo: fa.cache.get('user_info')
      })
  },
  async onReachBottom() {
    // water fall
    if (this.data.shops.noMore === true) {
        return false
    } else {
        this.style3GetGoodsList()
    }
  },
  async style3GetGoodsList() {
    const { shops } = this.data

    const page = shops.page
    if (page > 1 && shops.noMore === true) {
        return
    }
    const rows = shops.rows
    const list = page === 1 ? [] : shops.list
    let requestParam = { page, rows }
    if (shops.categoryId > 0) {
        requestParam['category_ids'] = [parseInt(shops.categoryId)]
    }
    const result = await shopsModel.list(requestParam)
    if (result) {
        let data = { page: page + 1 }
        if (result.list.length === 0) {
            data['noMore'] = true
        }

        data['list'] = list.concat(result.list)
        this.setData({
            shops: {
                ...this.data.shops, ...data
            }
        })
    }

    if (this.data.shopsCateClick) {
      this.selectComponent('#waterfall_shops_id').data.initlist = this.selectComponent('#waterfall_shops_id').data.images
      this.selectComponent('#waterfall_shops_id').data.list = this.selectComponent('#waterfall_shops_id').data.images

      this.data.shopsCateClick = false
  }

  }
})