import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import fa from "../../../utils/fa";
// import { inherits } from "util";
import ShopsModel from '../../../models/shops'
import ShopsCollectModel from '../../../models/shopsCollect'
// import { inherits } from 'util';

const shopsModel = new ShopsModel()
const shopsCollectModel = new ShopsCollectModel()

Page({
    data: {
        id: null,
        shopImage: null,
        shopName: null,
        shopImages: null,
        shopTopVide: null,
        shopInfo: null,
        shopOwner: null,
        shopOwnerAvatar: null,
        address: null,
        followed: false,
        followText: '关注',
        topElementType: '',
        goods: {
            page: 1,
            rows: 10,
            noMore: false,
            list: [],
            style: 3,
            categoryList: null,
            smallImageWidth: 0,
            categoryId: null,
            categoryClickIndex: -1
        }
    },
    async onCollect() {
        const result = await shopsCollectModel.add({
            shop_id: this.data.id
        })

        if (result !== false) {
            this.setData({
                followed: true,
                followText: '已关注'
            })
            fa.toast.show({
                title: '成功关注'
            })
        }
        if (this.data.userInfo) {
            // const result = await shopsCollectModel.add({
            //   shop_id: this.data.id
            // })

            // if (result !== false) {
            //     fa.toast.show({
            //         title: '成功关注'
            //     })
            // }
        } else {
            return false
        }
    },
    videoImagesSwitch(e) {
        this.setData({
            topElementType: e.currentTarget.dataset.bannertype
        });
    },
    async onLoad(options) {
        this.setData({
            id: options['id'] ? options['id'] : 16,
        })

        const shopGoods = await shopsModel.detail({
            id: options.id
        })
        console.log('aaaa', shopGoods.top_video)
        if (shopGoods.top_video.url && shopGoods.images.length > 0) {
            this.setData({
                hasVideoImages: true,
                topElementType: 'video'
            })
        } else {
            this.setData({
                topElementType: shopGoods.top_video.url ? 'video' : 'images'
            })
        }

        this.setData({
            shopImage: shopGoods.image,
            shopName: shopGoods.title,
            shopImages: shopGoods.images,
            shopTopVide: shopGoods.top_video,
            address: shopGoods.address,
            followed: shopGoods.follow,
            followText: (shopGoods.follow) ? '已关注' : '关注',
            shopInfo: shopGoods.shop_info,
            shopOwner: shopGoods.shop_owner,
            shopOwnerAvatar: shopGoods.shop_owner_avatar,
            goods: {
                list: shopGoods.goods
            }
        })
    }
})