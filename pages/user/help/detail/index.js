import fa from '../../../../utils/fa'
import HelpModel from '../../../../models/help'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'

const helpModel = new HelpModel()

Page({
    data: {
        info: null,
    },
    async onLoad(options) {
        this.getHelpInfo(options)
    },
    async getHelpInfo(options) {
        const result = await helpModel.info({
            id: options.id
        })
        
        if (result) {
            this.setData({
                'info': result
            })
        }
    }
})
