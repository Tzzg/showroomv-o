import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { ShopsListInterface, ShopsDetailInfoInterface } from '../interface/shops'

export default class Shops extends Model {
    async list(params) {
        try {
            const { result } = await request(api.shops.list, { data: params })
            return new ShopsListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async detail(params) {
        try {
            const { result } = await request(api.shops.detail, { data: params })
            return new ShopsDetailInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }


}