import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { HelpListInterface } from '../interface/help'
import { HelpInfoInterface } from '../interface/helpDetail'

export default class Help extends Model {
    async list(params) {
        try {
            const { result } = await request(api.help.list, { data: params })
            return new HelpListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.help.info, { data: params })
            return new HelpInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await request(api.help.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}