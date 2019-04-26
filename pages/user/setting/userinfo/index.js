import fa from '../../../../utils/fa'
import UserModel from '../../../../models/user'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'
import {uploadSingleFile} from '../../../../utils/helper'
import { api, request } from '../../../../api';

const userModel = new UserModel()

//index.js
Page({
    data: {
        genderStateList: ['保密','男','女'],
        userImg: null,
        birth: null,
        gender: null,
        nickname: null,
        actionSheetHidden: true, // 是否显示底部可选菜单
        actionSheetItems: [
            { bindtap: 'changeImage', txt: '修改头像' },
            { bindtap: 'viewImage', txt: '查看头像' }
        ]
    },

    onLoad() {

        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })

        this.getUserInfo()
    },

    async getUserInfo(){
        const result = await userModel.profileInfo()

        if (result) {
            this.setData({
                userImg: result.avatar,
                nickname: result.nickname,
                gender: result.gender,
                birth: result.birth
            })
        }
    },

    bindDateChange(e) {
        this.setData({
            birth: e.detail.value
        })

        console.log('picker birth: ', e.detail.value)
    },

    onGenderStateChange(e) {
        this.setData({
            gender: e.detail.detail.value
        })
    },

    onUploadAvatar(e) {
        console.log('change user avatar')
        let that = this;
        that.setData({
            actionSheetHidden: !that.data.actionSheetHidden
        })
    },

    changeImage() {
        let that = this;
        let uploadAvatarApi = api.user.addAvatar
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0
                var tempFilePaths = res.tempFilePaths[0];
                that.setData({
                    userImg: tempFilePaths,
                    actionSheetHidden: !that.data.actionSheetHidden
                })
                uploadSingleFile(uploadAvatarApi, tempFilePaths, 'imgFile' ,{}, function (res) {
                    let response = JSON.parse(res)
                    console.log('after uploaded 123', response);
                    if (null != res) {
                        that.setData({
                            userImg: response.result.image
                        })
                    } else {
                        // 显示消息提示框
                        wx.showToast({
                            title: '上传失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                });
            }
        })
    },

    viewImage() {
        let that = this;
        wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: [that.data.userImg] // 需要预览的图片http链接列表
        })
    },

    actionSheetbindchange() {
        let that = this;
        that.setData({
            actionSheetHidden: !that.data.actionSheetHidden
        })
    },

    nicknameInput(e) {
        this.setData({
            nickname: e.detail.value
        })
    },

    async onSubmit(e) {
        console.log('avatar', this.data.userImg)
        console.log('nickname', this.data.nickname)
        console.log('gender', this.data.gender)
        console.log('birth', this.data.birth)
        if (!this.data.nickname) {
            return fa.toast.show({ title: '请输入昵称' })
        }
        if (!this.data.gender) {
            return fa.toast.show({ title: '请选择性别' })
        }

        let data = {
            avatar: this.data.userImg,
            nickname: this.data.nickname,
            gender: this.data.gender,
            birth: this.data.birth
        }

        const result = await userModel.editProfileInfo(data)
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
