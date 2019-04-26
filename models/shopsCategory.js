import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { ShopsCategoryListInterface } from '../interface/shopsCategory'

export default class ShopsCategory extends Model {
    async list(params) {
        try {
            const { result } = await request(api.shopsCategory.list, { data: params })
            return new ShopsCategoryListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.shopsCategory.info, { data: params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
