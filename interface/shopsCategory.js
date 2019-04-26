import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class ShopsCategoryListInterface extends Interface {
    list;

    constructor(params) {
        super()
        try {
            if (params.list.length > 0) {
                this.list = params.list.map(function (item) {
                    return new ShopsCategoryListChildInterface(item)
                });
            } else {
                this.list = []
            }
        } catch (e) {
            throw new Exception(e, 'ShopsCategoryListInterface interface attribute error')
        }
    }
}

export class ShopsCategoryListChildInterface extends Interface {
    id;
    name;
    pid;
    childs;
    icon;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.name = param.name
            this.pid = param.pid
            this.icon = param.icon
            if (typeof param._child !== 'undefined' && param._child.length > 0) {
                this.childs = param._child.map(function (item) {
                    return new ShopsCategoryListChildInterface(item)
                });
            } else {
                this.childs = []
            }
        } catch (e) {
            throw new Exception(e, 'ShopsCategoryListChildInterface interface attribute error')
        }
    }
}
