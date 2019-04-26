import fa from '../../../../utils/fa'
import HelpModel from '../../../../models/help'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'
import { UploadImageInterface } from '../../../../interface/uploadImage'
import { api } from '../../../../api'

const helpModel = new HelpModel()

Page({
    data: {
        delta: 1,
        content: '',
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderCount: 9,
        uploaderUrl: null,
        uploaderButtonText: '上传图片(最多9张)',
        uploaderHeader: {},
    },
    async onLoad({ id, delta = 1 }) {
        const accessToken = fa.cache.get('user_token')
        
        this.setData({
            delta: typeof delta !== 'undefined' ? delta : 1,
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            }
        })
    },
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.data.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setData({
            uploaderFiles: fa.remove(this.data.uploaderFiles, e.detail.url)
        })
    },
    onContentChange(e) {
        this.setData({
            content: e.detail.detail.value
        })
    },

    async onSubmit() {
        if (!this.data.content) {
            return fa.toast.show({ title: '请输入反馈内容' })
        }

        let data = {
            content: this.data.content
        }
        if (this.data.uploaderFiles.length > 0) {
            data['images'] = this.data.uploaderFiles
        }

        const result = await helpModel.add(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(goodsEvaluateModel.getException().getCode())
            })
        } else {
            this.updateListRow()
            wx.navigateBack({
                delta: this.data.delta
            })
        }
    },
    updateListRow() {
        const { id } = this.data
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
})
