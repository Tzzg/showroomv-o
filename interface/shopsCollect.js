import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class ShopsCollectListInterface extends Interface {
    list;
    total_number;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function(item) {
                return new ShopsCollectListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'ShopsCollectListInterface interface attribute error')
        }
    }
}

export class ShopsCollectListInfoInterface extends Interface {
    id;
    title;
    image;
    category_ids;
    address;
    avatar;
    shop_owner;
    like_num;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.category_ids = param.category_ids
            this.image = param.image
            this.address = param.address
            this.avatar = param.avatar
            this.shop_owner = param.shop_owner
            this.like_num = param.like_num
        } catch (e) {
            throw new Exception(e, 'ShopsCollectListInfoInterface interface attribute error')
        }
    }
}