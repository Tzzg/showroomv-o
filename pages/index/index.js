import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import PageModel from "../../models/page";
import GoodsCategoryModel from "../../models/goodsCategory";
import GoodsModel from "../../models/goods";

const pageModel = new PageModel()
const categoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()

Page({
    data: {
        pageData: null,
        backgroundColor:'#f8f8f8',
        banners: {
            options: {layout_style: 1},
            data: [
                {img:{url: 'https://cn.bing.com/th?id=OHR.LeopardNamibia_ZH-CN9585068449_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
                {img:{url: 'https://cn.bing.com/th?id=OHR.SeptimiusSeverus_ZH-CN0799811992_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
                {img:{url: 'https://cn.bing.com/th?id=OHR.AgriculturalPi_ZH-CN9754138523_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'}},
            ],
        },
        shopsCircles: [
            {
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
        list: [
            {image: 'https://www.dior.cn/couture/ecommerce/media/catalog/product/cache/1/grid_image_2/460x497/17f82f742ffe127f42dca9de82fb58b1/B/0/1544172369_B0403CVWV_M900_E02_GH.jpg', desc: 'product01'},
            {image: 'https:///img.alicdn.com/imgextra/i1/399037564/TB2bwHBcShlpuFjSspkXXa1ApXa_!!399037564.jpg_430x430q90.jpg', desc: 'product02'},
            {image: 'https://gdp.alicdn.com/imgextra/i4/2978217349/O1CN01QolOwm249tBLJtX9C_!!2978217349.jpg', desc: 'product03'},
            {image: 'https:////club2.autoimg.cn/album/g3/M08/CF/67/userphotos/2019/02/11/15/500_ChcCRVxhI8yAUW1VAAGwbIlBs0U425.jpg', desc: 'product04'},
            {image: 'https://car2.autoimg.cn/cardfs/product/g1/M02/0A/4A/744x0_1_autohomecar__ChcCQ1x5C3iAYYT-AALRs2yoBPw585.jpg', desc: 'product05'}
        ], // 模拟数据
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
        goodsCateClick: false
    },
    heightlog (e) {
        this.setData({ dValue: e.detail})
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.initPage()
        this.style3GetGoodsList()

        // console.log('-abc-')
        // console.log(this.data.list)
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
        const listHomeProducts = await pageModel.ListHomeProducts()
        // console.log(listHomeProducts.body)
        this.setData({
            pageData: page.body,
            backgroundColor:page.background_color,
            listHomeProductsData: listHomeProducts.body,
        })

        // console.log(listHomeProducts)
        wx.setNavigationBarTitle({
            // title: page.name
            title: listHomeProducts.name
        })

        // category
        const categoryListResult = await categoryModel.list()
        const systemInfo = wx.getSystemInfoSync()
        const categoryListResult3 = await categoryModel.list()
        const categoryList3 = categoryListResult3.list
        this.setData({
            'style3.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
            'style3.categoryList': categoryList3
        })

        console.log(categoryList3)
    },
    async style3GetGoodsList() {
        if (this.isLoading) return
        this.setData({isLoading: true})

        const { style3 } = this.data
        const page = style3.page

        if (page > 1 && style3.noMore === true) {
            return
        }
        const rows = style3.rows
        const list = page === 1 ? [] : style3.list
        let requestParam = { page, rows }
        if (style3.categoryId > 0) {
            requestParam['category_ids'] = [parseInt(style3.categoryId)]
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData({
                style3: {
                    ...this.data.style3, ...data
                }
            })

            this.setData({isLoading: false})
        }


        if (this.data.goodsCateClick) {
            console.log('--- this is thing ---')
            // console.log(getCurrentPages())
            // this.selectComponent('#water_fall_id').data.initlist = {}
            // this.selectComponent('#water_fall_id').data.list = {}


            // if (getCurrentPages().length != 0) {
            //     //刷新当前页面的数据
            //     getCurrentPages()[getCurrentPages().length - 1].onLoad()
            // }

            this.selectComponent('#water_fall_id').data.initlist = this.selectComponent('#water_fall_id').data.images
            this.selectComponent('#water_fall_id').data.list = this.selectComponent('#water_fall_id').data.images

            this.data.goodsCateClick = false
        }

        // this.selectComponent('#water_fall_id').data.initlist = this.selectComponent('#water_fall_id').data.images
        // this.selectComponent('#water_fall_id').data.list = this.selectComponent('#water_fall_id').data.images

        console.log('style3GetGoodsList123')
        console.log(this.selectComponent('#water_fall_id').data)
    },
    style3CategoryClick(e) {
        this.setData({
            'style3.page': 1,
            'style3.categoryId': e.currentTarget.dataset.categoryId,
            'style3.categoryClickIndex': parseInt(e.currentTarget.dataset.index),
            'goodsCateClick': true
        })
        this.style3GetGoodsList()
    },
    onPullDownRefresh() {
        this.initPage()
        wx.stopPullDownRefresh()
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
                    id:link.param.id
                })
                wx.navigateTo({
                    url: `/pages/goods/search/index?category_id=${link.param.id}&category_keywords=${category.name}`
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
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
})
