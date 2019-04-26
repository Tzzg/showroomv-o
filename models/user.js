import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { UserEvaluatedListInterface, UserSelfInterface, UserTokenInfoInterface, UserCertInfoInterface, UserProfileInfoInterface, UserPolicyInterface } from '../interface/user'

export default class User extends Model {
    constructor(){
        super(null)
    }
    async login(params = { login_type: 'password', phone: null, password: null }) {
        try {
            const { result } = await request(api.user.login, { data: params })
            return new UserTokenInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async register(params) {
        try {
            request(api.user.register, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async logout() {
        try {
            await request(api.user.logout)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async editPassword(params) {
        try {
            await request(api.user.editPassword, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async findPassword() {
        try {
            await request(api.user.findPassword)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async token() {
        try {
            const { result } = await request(api.user.token)
            return new UserTokenInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async self(token) {
        try {
            // const { result } = await request(api.user.self)
            const { result } = await request(api.user.self, { selfToken: token })
            return new UserSelfInterface(result)
        } catch (e) {
            console.log(e)
            this.setException(e)
            return false
        }
    }

    async editPasswordByFind(params) {
        try {
            await request(api.user.editPasswordByFind, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async editProfile(params) {
        try {
            await request(api.user.editProfile, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async bindPhone(params) {
        try {
            await request(api.user.bindPhone, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async bindWechat(params) {
        try {
            await request(api.user.bindWechat, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async unbindWechat() {
        try {
            await request(api.user.unbindWechat)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async unbindPhone() {
        try {
            await request(api.user.unbindPhone)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    // todo interface
    async evaluatedList() {
        try {
            const { result } = await request(api.user.evaluatedList)
            return new EvaluatedListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    // new model method
    async certInfo() {
        try {
            const { result } = await request(api.user.certInfo)
            return new UserCertInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async editCertInfo(params) {
        try {
            await request(api.user.editCertCode, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async profileInfo() {
        try {
            const { result } = await request(api.user.profileInfo)
            return new UserProfileInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async editProfileInfo(params) {
        try {
            await request(api.user.editProfileInfo, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async sendUserPolicy(params) {
        try {
          console.log(api.user.policy)
            const { result } = await request(api.user.policy, { data: params })
            return new UserPolicyInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}