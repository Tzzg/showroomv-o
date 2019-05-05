import fa from "../../utils/fa";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import PageModel from "../../models/page";
import GoodsCategoryModel from "../../models/goodsCategory";
import GoodsModel from "../../models/goods";

const pageModel = new PageModel()
const categoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()
    // pages/others/waterfall/waterfall.js
Page({
    data: {
        list: [],
        leftHeight: 0,
        rightHeight: 0,
        vSpaceHeight: 9,
        length: 5,
        pageNo: 1,
        descHeight: 50, //图片文字描述的高度
        pageStatus: true, // last section
        style3: {
            page: 1,
            rows: 5,
            noMore: false,
            list: [],
            style: 3,
            categoryList: null,
            smallImageWidth: 0,
            categoryId: null,
            categoryClickIndex: -1
        },
    },
    async initPage() {
        const page = await pageModel.portal()

        this.setData({
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

            if (result.list.length > 0 && result.list.length < 5) {
                // let filledArray = this.fillEmptyArray(5 - result.list.length)
                // result.list = result.list.concat(filledArray)

                this.setData({
                    length: result.list.length
                })
            } else {
                this.setData({
                    length: 5
                })
            }
            data['list'] = list.concat(result.list)

            this.setData({
                style3: {
                    ...this.data.style3,
                    ...data
                }
            })

            this.setData({
                list: list.concat(result.list),
                isLoading: false
            })
        }
    },
    style3CategoryClick(e) {
        this.setData({
            'style3.page': 1,
            'style3.categoryId': e.currentTarget.dataset.categoryId,
            'style3.categoryClickIndex': parseInt(e.currentTarget.dataset.index),
            'goodsCateClick': true,
            'style3.noMore': false,
            'list': [],
            'leftHeight': 0,
            'rightHeight': 0,
            'pageNo': 1
        })
        this.style3GetGoodsList()
    },
    onSearchClick() {
        wx.navigateTo({
            url: `/pages/goods/search/index`
        })
    },
    onBannerClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onLoad: function() {
        this.setData({
            list2: this.data.list
        });

        wx.showShareMenu({
            withShareTicket: true
        })
        this.initPage()
        this.style3GetGoodsList()
    },
    loadImage: function(e) {
        let vm = this;
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let screenWidthHalf = windowWidth / 2 * 0.94;
        let objImageHeight = screenWidthHalf * e.detail.height / e.detail.width

        let index = e.currentTarget.dataset.index;
        // vm.data.list[index].height = Math.round(windowWidth / 2 / e.detail.width * e.detail.height);
        vm.data.list[index].height = Math.round(objImageHeight);

        let count = 0;
        let perPage = 5;
        for (var i = (vm.data.pageNo - 1) * perPage; i < vm.data.list.length; i++) {
            if (vm.data.list[i].height) {
                count++;
            }
        }

        if (count == vm.data.length) {

            for (var i = (vm.data.pageNo - 1) * perPage; i < vm.data.list.length; i++) {
                if (vm.data.leftHeight <= vm.data.rightHeight) {
                    vm.data.list[i].top = vm.data.leftHeight + vm.data.vSpaceHeight;
                    vm.data.list[i].left = windowWidth * 0.005;
                    vm.setData({
                        leftHeight: Math.round(vm.data.leftHeight + vm.data.list[i].height + vm.data.descHeight + vm.data.vSpaceHeight)
                    });
                    console.log('test left', vm.data.leftHeight)
                } else {
                    vm.data.list[i].top = vm.data.rightHeight + vm.data.vSpaceHeight;
                    vm.data.list[i].left = windowWidth / 2 - windowWidth * 0.005;
                    vm.setData({
                        rightHeight: Math.round(vm.data.rightHeight + vm.data.list[i].height + vm.data.descHeight + vm.data.vSpaceHeight)
                    });
                    console.log('test right', vm.data.rightHeight)
                }
            }
            vm.setData({
                list: vm.data.list
            });

        }
    },
    onReachBottom: function() {
        var vm = this;
        vm.setData({
            pageStatus: true
        });
        setTimeout(() => {
            this.style3GetGoodsList()
            vm.setData({
                pageNo: vm.data.pageNo + 1,
                // list: vm.data.list.concat(vm.data.list2),
                pageStatus: false
            });
        }, 2000);
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
    fillEmptyArray: function(num) {
        let arr = []

        for (var i = 0; i < num; i++) {
            arr.push(i)
        }

        return arr
    }
})