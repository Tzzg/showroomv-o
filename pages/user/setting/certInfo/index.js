import fa from '../../../../utils/fa'
import UserModel from '../../../../models/user'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'
import { UploadImageInterface } from '../../../../interface/uploadImage'
import { api } from '../../../../api'

const userModel = new UserModel()

Page({
    data: {
        realName: '',
        certCode: null,
        gender: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderCount: 2,
        uploaderUrl: null,
        uploaderButtonText: '上传身份证照片(最多2张)',
        uploaderHeader: {},
    },

    async onLoad() {
        this.getCertInfo()

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

    async getCertInfo() {
        const result = await userModel.certInfo()
        let certCode = result.cert_code
        let certCodeStar = (certCode) ? certCode.substr(0, certCode.length - 4) + '****' : ''

        if (result) {
            this.setData({
                realName: result.real_name,
                certCode: certCodeStar,
                uploaderFiles: result.images
            })
        }
    },

    // bindDateChange(e) {
    //     this.setData({
    //         date: e.detail.value
    //     })
    // },

    // onGenderStateChange(e) {
    //     this.setData({
    //         gender: e.detail.value
    //     })
    // },

    // onEdit(e) {
    //     console.log('shit')
    // },

    realNameInput(e) {
        this.setData({
            realName: e.detail.value
        })
    },

    certCodeInput(e) {
        this.setData({
            certCode: e.detail.value
        })
    },

    async onSubmit(e) {
        console.log('realname', this.data.realName)
        console.log('certcode', this.data.certCode)
        if (!this.data.realName) {
            return fa.toast.show({ title: '请输入姓名' })
        }
        if (!this.data.certCode) {
            return fa.toast.show({ title: '请输入身份证号码' })
        }

        let data = {
            realName: this.data.realName,
            certCode: this.data.certCode
        }

        if (this.data.uploaderFiles.length > 0) {
            data['images'] = this.data.uploaderFiles
        }

        const result = await userModel.editCertInfo(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(userModel.getException().getCode())
            })
        } else {
            return fa.toast.show({ title: '保存成功' })
                // wx.navigateBack({
                //     delta: 1
                // })
        }
    }

})