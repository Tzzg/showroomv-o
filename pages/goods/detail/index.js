import GoodsModel from '../../../models/goods'
import CartModel from '../../../models/cart'
import GoodsEvaluateModel from '../../../models/goodsEvaluate'
import GoodsCollectModel from '../../../models/goodsCollect'
import fa from '../../../utils/fa'
import CartLogic from '../../../logics/cart'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const goodsModel = new GoodsModel()
const cartModel = new CartModel()
const goodsEvaluateModel = new GoodsEvaluateModel()
const goodsCollectModel = new GoodsCollectModel()

const WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        onLoaded: false,
        hasVideoImages: false,
        id: 15,
        userInfo: {},
        imageWidth: 0,
        cartTotalNumber: 0,
        cartGoods: null,
        inCartNumber: 0,
        inCartNumberNoSpec: 0,
        buyMode: 'cart', // cart buy_now
        goods_sku_id: null,
        goodsSkuInfo: null,
        goodsNoSpec: null,
        showBottomPopup: false,
        specValueIdsChecked: [],
        evaluateList: [],
        spec_list: [],
        stepper: 1,
        topElementType: '',
        checkedCartIds: [],
        follow: false,
        followImage: '/themes/default/goods/collect.png',
        followText: '收藏',
        list: [{
                id: '1',
                title: '商品'
            },
            {
                id: '2',
                title: '评价'
            },
            {
                id: '3',
                title: '详情'
            }
        ],
        rich_text: '',
        selectedId: '1',
        detail: {}
    },
    async onLoad(options) {
        wx.showShareMenu({
                withShareTicket: true
            })
            // todo 商品不存在的情况判断
            // todo 已经下架的状态
        this.setData({
            id: options['id'] ? options['id'] : 16,
        })
        await this.initGoodsInfo()
        await this.initGoodsEvaluateList()
        const user_info = fa.cache.get('user_info')
        this.setData({
            userInfo: user_info
        })
        if (user_info) {
            this.initTotalNumber()
        }

        // check goods have spec or not
        if (this.data.detail.spec_list.length < 1) {
            this.setData({
                goodsNoSpec: true
            })
        }

        if (this.data.detail.top_video.url && this.data.detail.images.length > 0) {
            this.setData({
                hasVideoImages: true,
                topElementType: 'video'
            })
        } else {
            this.setData({
                topElementType: this.data.detail.top_video.url ? 'video' : 'images'
            })
        }

        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            imageWidth: (systemInfo.windowWidth - 18) / 2
        })

        // goods collect check
        let goodsCollectStatus = this.data.detail.follow
        this.setData({
            followImage: goodsCollectStatus ? '/themes/default/goods/collect-a.png' : '/themes/default/goods/collect.png',
            followText: goodsCollectStatus ? '已收藏' : '收藏'
        })
    },
    async initGoodsEvaluateList() {
        const result = await goodsEvaluateModel.list({
            goods_id: this.data.detail.id,
            page: 1,
            rows: 3
        })
        if (result) {
            this.setData({
                evaluateList: result
            })
        }
    },
    addCart() {
        // 判断是否需登陆了
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'cart'
        });
    },
    buyNow() {
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'buy_now'
        });

    },
    buyImmediateCheck() {
        if (this.data.detail.sku_list.length <= 1) {
            this.data.checkedCartIds.push(this.data.detail.id)
            wx.redirectTo({
                url: '/pages/cart/orderFill/index?cart_ids=' + JSON.stringify(this.data.checkedCartIds)

            })
        }
    },
    onLoginSuccess() {
        this.setData({
            userInfo: fa.cache.get('user_info')
        })
    },
    async onCollect() {
        if (this.data.userInfo) {
            const result = await goodsCollectModel.add({
                goods_id: this.data.detail.id
            })
            if (result !== false) {
                fa.toast.show({
                    title: '成功收藏'
                })

                this.setData({
                    followImage: '/themes/default/goods/collect-a.png',
                    followText: '已收藏'
                })
            }
        } else {
            return false
        }
    },
    onHome() {
        wx.switchTab({
            url: '/pages/index_new/index'
        })
    },
    goCart() {
        if (this.data.userInfo) {
            wx.switchTab({
                url: '/pages/cart/index'
            })
        } else {
            return false
        }
    },
    toggleGoodsSkuSelect() {
        this.setData({
            showBottomPopup: !this.data.showBottomPopup
        });
    },
    onStepperChange(e) {
        this.setData({
            stepper: e.detail
        })
    },
    videoImagesSwitch(e) {
        this.setData({
            topElementType: e.currentTarget.dataset.bannertype
        });
    },
    goShopsDetail(e) {
        wx.navigateTo({
            url: '/pages/shops/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    async onGoodsSkuMatchSuccess(e) {
        this.setData({
            goodsSkuInfo: e.detail.goodsSkuInfo
        })
        const cartGoods = await cartModel.info({ goods_sku_id: e.detail.goodsSkuInfo.id })
        if (cartGoods) {
            this.setData({
                cartGoods: cartGoods,
                inCartNumber: cartGoods.goods_num
            })
        }
    },
    async onGoodsSkuMatchFail(e) {
        this.setData({
            specValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    },
    async buyConfirmNoSpec(e) {
        const goodsSkuInfoNoSpec = this.data.detail.sku_list[0]

        const inCartNumberNoSpec = this.data.inCartNumberNoSpec + this.data.stepper
        if (!this.data.userInfo) {
            this.login()
        } else if (inCartNumberNoSpec > goodsSkuInfoNoSpec.stock) {
            fa.toast.show({
                title: '库存不足' // todo 加入到code
            })
        } else {
            const cartLogicNoSpec = new CartLogic()
            const resultNoSpec = await cartLogicNoSpec.save(goodsSkuInfoNoSpec.id, this.data.buyMode === 'buy_now' ? this.data.stepper : inCartNumberNoSpec)
            if (resultNoSpec !== false) {
                if (this.data.buyMode === 'buy_now') {
                    const cartInfoNoSpec = await cartModel.info({ goods_sku_id: goodsSkuInfoNoSpec.id })
                    wx.navigateTo({
                        url: '/pages/cart/orderFill/index?way=buy_now&cart_ids=' + JSON.stringify([cartInfoNoSpec.id])
                    })
                } else {
                    fa.toast.show({
                        title: '成功加入购物车'
                    })
                }
                this.setData({
                    inCartNumberNoSpec: inCartNumberNoSpec
                })
                this.initTotalNumber()
                this.toggleGoodsSkuSelect()
            } else {
                fa.toast.show({
                    title: fa.code.parse(cartLogicNoSpec.cartModel.getException().getCode())
                })
            }
        }
    },
    async buyConfirm(e) {
        const goodsSkuInfo = this.data.goodsSkuInfo
        if (!goodsSkuInfo) {
            fa.toast.show({
                title: '请选择商品规格'
            })
            return false
        } else {
            const inCartNumber = this.data.inCartNumber + this.data.stepper
            if (!this.data.userInfo) {
                this.login()
            } else if (inCartNumber > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic()
                const result = await cartLogic.save(goodsSkuInfo.id, this.data.buyMode === 'buy_now' ? this.data.stepper : inCartNumber)
                if (result !== false) {
                    if (this.data.buyMode === 'buy_now') {
                        const cartInfo = await cartModel.info({ goods_sku_id: goodsSkuInfo.id })
                        wx.navigateTo({
                            url: '/pages/cart/orderFill/index?way=buy_now&cart_ids=' + JSON.stringify([cartInfo.id])
                        })
                    } else {
                        fa.toast.show({
                            title: '成功加入购物车'
                        })
                    }
                    this.setData({
                        inCartNumber: inCartNumber
                    })
                    this.initTotalNumber()
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    },
    async initTotalNumber() {
        const cartTotalNumber = await cartModel.totalNum()
        if (cartTotalNumber !== false) {
            this.setData({
                cartTotalNumber: cartTotalNumber
            })
        }
    },
    async initGoodsInfo() {
        let that = this
        const result = await goodsModel.info({
            id: this.data.id
        })

        if (result) {
            let detail = result.info
            WxParse.wxParse('rich_text', 'html', detail.rich_description, that, 25)
            this.setData({
                detail
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(goodsModel.getException().getCode())
            })
        }
        // 防止提前渲染报错
        this.setData({
            onLoaded: true,
        })
    },
    bodyImagePreview({ currentTarget }) {
        let images = []
        this.data.detail.body.forEach(function(item, index, array) {
            if (item.type === 'image') {
                images.push(item.value.url)
            }
        });
        wx.previewImage({
            current: currentTarget.dataset.url,
            urls: images
        })
    },
    onBodyGoodsClick() {
        // 当前页面跳转，小程序选择无限级页面，或者跳转前关闭当前，回来的时候back判断上一层点击的id，这样能弥补没法返回的功能
    },
    bannerPreview({ currentTarget }) {
        wx.previewImage({
            current: currentTarget.dataset.url,
            urls: this.data.detail.images
        })
    },
    goGoodsEvaluateList() {
        wx.navigateTo({
            url: '/pages/goods/evaluateList/index?goods_id=' + this.data.detail.id
        })
    },
    onShareAppMessage: function() {
        const goodsInfo = this.data.detail
        return {
            title: goodsInfo.title,
            path: `/pages/goods/detail/index?id=${goodsInfo.id}`
        }
    }
})