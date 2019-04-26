import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { GoodsListHomeInterface, GoodsListInterface } from '../interface/goods'
import { GoodsInterface } from '../interface/goodsDetail'

export default class Goods extends Model {
    async listHome(params) {
        try {
            const { result } = await request(api.goods.list_home, { data: params })
            return new GoodsListHomeInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async list(params) {
        try {
            const { result } = await request(api.goods.list, { data: params })
            return new GoodsListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.goods.info, { data: params })
            return new GoodsInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}