import ShopsCollectModel from '../../../models/shopsCollect'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const shopsCollectModel = new ShopsCollectModel()

Page({
    data: {
        imageWidth: 0,
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onLoad() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            imageWidth: (systemInfo.windowWidth - 18) / 2
        })
        this.getList()
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        let requestParam = { page, rows }

        const result = await shopsCollectModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    goShopsDetail(e) {
        wx.navigateTo({
            url: '/pages/shops/detail/index?id=' + e.currentTarget.dataset.id
        })
    }
})
