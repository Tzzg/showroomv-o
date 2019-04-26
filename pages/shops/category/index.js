import ShopsCategoryModel from "../../../models/shopsCategory";
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
// import fa from "../../../utils/fa";
// import { inherits } from "util";
import ShopsModel from '../../../models/shops'
// import GoodsModel from "../../models/goods";

const shopsCategoryModel = new ShopsCategoryModel()
const shopsModel = new ShopsModel()

Page({
  data: {
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
    note:[
      {
        name: '大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼',
        heart_num: '1',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '2',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '3',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        name: '大脸猫爱吃鱼',
        heart_num: '4',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '5',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '6',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '7',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        name: '大脸猫爱吃鱼',
        heart_num: '8',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }
    ]},
  onLoad() {
    wx.showShareMenu({
        withShareTicket: true
    })
    this.style3GetGoodsList()
    console.log('qwwqerqwerwe1`````')
  },
  async init () {
    const systemInfo = wx.getSystemInfoSync()
    const shopCategoryListResult3 = await shopsCategoryModel.list()
    const shopCategoryList3 = shopCategoryListResult3.list
    this.setData({
        'style3.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
        'style3.categoryList': shopCategoryList3
    })
    this.style3GetGoodsList()
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
  }
})