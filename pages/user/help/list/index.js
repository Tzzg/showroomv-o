import fa from '../../../../utils/fa'
import HelpModel from '../../../../models/help'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'

const helpModel = new HelpModel()

Page({
    data: {
        list: [],
    },
    async onShow() {
        this.initList()
    },
    initList() {
        // this.setData({
        //     page: 1
        // })
        // this.getList()

        // this.getHelpList()
    },
    goHelpDetail(e) {
        wx.navigateTo({
            url: '/pages/user/help/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    goExternalFaq(e) {
        let urlFaqExternal = 'https://os.showroomv.com/wap/Helpcenter'
        const url = encodeURIComponent(urlFaqExternal)
        wx.navigateTo({
            url: `/pages/webView/index?url=${url}`
        })
    },
    async getHelpList() {
        const result = await helpModel.list()

        if (result) {
            this.setData({
                'list': result.list
            })
        }
        console.log(this.data)
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        const result = await addressModel.list({
            page,
            rows
        })
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
    }
})
