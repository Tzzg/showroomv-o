import fa from "../../utils/fa";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import PageModel from "../../models/page";
import GoodsCategoryModel from "../../models/goodsCategory";
import GoodsModel from "../../models/goods";

import md5 from '../../utils/js-md5'
import helper from '../../utils/helper'

const pageModel = new PageModel()
const categoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()

Page({
    data: {
        pageData: null,
        backgroundColor: '#f8f8f8',
        hasMask: true,
        user_policy: '',
        banners: {
            options: { layout_style: 1 },
            data: [],
        },
        homeCircles: [{
                title: "好店",
                img: 'http://imageqiniu.laosiji.com/FliipUSBdPdPhdXjNN1GNHKtbM74',
                shopCateId: 3
            },
            {
                title: "市集",
                img: 'http://imageqiniu.laosiji.com/FliipUSBdPdPhdXjNN1GNHKtbM74',
                shopCateId: 5
            },
            {
                title: "品牌馆",
                img: 'http://imageqiniu.laosiji.com/FliipUSBdPdPhdXjNN1GNHKtbM74',
                shopCateId: 8
            }
        ],
        listHomeProductsData: null,
        wrapperHeight: 0, // 需要更新的最外层盒子高度
        list: [], // 模拟数据
        dValue: 0.1, // 列表高度差
        isLoading: false, // 阻止无限触发加载阈值
        style3: {
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
        goodsCateClick: false,
        adCircleDisplay: true
    },
    tapAgreeBtn() {
        this.setData({
            hasMask: false
        })
    },
    heightlog(e) {
        this.setData({ dValue: e.detail })
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.initPage()
        this.style3GetGoodsList()
    },
    onBannerClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGridNavBarClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGoodsClick(e) {
        const dataSource = e.detail.dataSource
        const goods = dataSource.data[e.detail.index]
        const link = {
            action: 'goods',
            param: {
                id: goods.id
            }
        }
        this.handelLink(link)
    },
    onIconNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onTextNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onShopWindowClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onSearchClick() {
        wx.navigateTo({
            url: `/pages/goods/search/index`
        })
    },
    async initPage() {
        const page = await pageModel.portal()

        this.setData({
            backgroundColor: page.background_color,
            banners: {
                options: { layout_style: 1 },
                data: page.home_slider
            },
            homeCircles: page.home_circle
        })

        wx.setNavigationBarTitle({
            title: '首页'
        })

        // category
        const systemInfo = wx.getSystemInfoSync()
        const categoryListResult3 = await categoryModel.list()
        const categoryList3 = categoryListResult3.list
        this.setData({
            'style3.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
            'style3.categoryList': categoryList3
        })
    },
    async style3GetGoodsList() {
        if (this.isLoading) return
        this.setData({ isLoading: true })

        const { style3 } = this.data
        const page = style3.page

        if (page > 1 && style3.noMore === true) {
            return
        }
        const rows = style3.rows
        const list = page === 1 ? [] : style3.list
        let requestParam = { page, rows }

        this.setData({
            adCircleDisplay: true
        })

        if (style3.categoryId > 0) {
            requestParam['category_ids'] = [parseInt(style3.categoryId)]
            this.setData({
                adCircleDisplay: false
            })
        }
        // const result = await goodsModel.list(requestParam)
        const result = await goodsModel.listHome(requestParam)

        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData({
                style3: {
                    ...this.data.style3,
                    ...data
                }
            })

            this.setData({ isLoading: false })
        }

        if (this.data.goodsCateClick) {
            this.setData({ isLoading: false })
                // this.selectComponent('#water_fall_id').data.initlist = {}
                // this.selectComponent('#water_fall_id').data.list = {}


            // if (getCurrentPages().length != 0) {
            //     //刷新当前页面的数据
            //     getCurrentPages()[getCurrentPages().length - 1].onLoad()
            // }

            // this.selectComponent('#water_fall_id').data.initlist = this.selectComponent('#water_fall_id').data.images
            this.selectComponent('#water_fall_id').data.list = this.selectComponent('#water_fall_id').data.images

            this.data.goodsCateClick = false
        }

        // this.selectComponent('#water_fall_id').data.initlist = this.selectComponent('#water_fall_id').data.images
        // this.selectComponent('#water_fall_id').data.list = this.selectComponent('#water_fall_id').data.images

    },
    style3CategoryClick(e) {
        this.setData({
            'style3.page': 1,
            'style3.categoryId': e.currentTarget.dataset.categoryId,
            'style3.categoryClickIndex': parseInt(e.currentTarget.dataset.index),
            'goodsCateClick': true,
            'style3.noMore': false
        })
        this.style3GetGoodsList()
    },
    onPullDownRefresh() {
        this.initPage()
        wx.stopPullDownRefresh()
    },
    onLoginSuccess() {
        this.setData({
            userInfo: fa.cache.get('user_info')
        })
    },
    async handelLink(link) {
        switch (link.action) {
            case 'portal':
                wx.switchTab({
                    url: '/pages/index/index'
                })
                break
            case 'goods':
                wx.navigateTo({
                    url: `/pages/goods/detail/index?id=${link.param.id}`
                })
                break
            case 'page':
                wx.navigateTo({
                    url: `/pages/page/index?id=${link.param.id}`
                })
                break
            case 'goods_category':
                const category = await categoryModel.info({
                    id: link.param.id
                })
                wx.navigateTo({
                    url: `/pages/goods/search/index?category_id=${link.param.id}&category_keywords=${category.name}`
                })
                break
            case 'external_link':
                const url = encodeURIComponent(link.param.url)
                wx.navigateTo({
                    url: `/pages/webView/index?url=${url}`
                })
                break
            case 'internal_link':
                const goToPage = link.param.url

                wx.navigateTo({
                    url: goToPage
                })
                break
        }
    },
    async onReachBottom() {
        // water fall
        if (this.data.style3.noMore === true) {
            return false
        } else {
            this.style3GetGoodsList()
        }
    },
    onShareAppMessage: function() {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
})