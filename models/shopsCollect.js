import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { ShopsCollectListInterface } from '../interface/shopsCollect'

export default class ShopsCollect extends Model {
    async list(params) {
        try {
            const { result } = await request(api.shopsCollect.mine, { data: params })
            return new ShopsCollectListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await request(api.shopsCollect.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async del(params) {
        try {
            await request(api.shopsCollect.del, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}