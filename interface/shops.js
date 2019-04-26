import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class ShopsListInterface extends Interface {
    list;
    total_number;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function(item) {
                return new ShopsListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'ShopsListInterface interface attribute error')
        }
    }
}

export class ShopsListInfoInterface extends Interface {
    id;
    title;
    category_ids;
    create_time;
    update_time;
    delete_time;
    like_num;
    image;
    address;
    avatar;
    shop_owner;
    key;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.category_ids = param.category_ids
            this.create_time = param.create_time
            this.update_time = param.update_time
            this.delete_time = param.delete_time
            this.like_num = param.like_num
            this.image = param.image
            this.address = param.address
            this.avatar = param.avatar
            this.shop_owner = param.shop_owner
            this.key = param.key
        } catch (e) {
            throw new Exception(e, 'ShopsListInfoInterface interface attribute error')
        }
    }
}

export class ShopsDetailInfoInterface extends Interface {
    id;
    title;
    images;
    top_video;
    address;
    follow;
    shop_info;
    shop_owner;
    shop_owner_avatar;
    image;
    goods;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.images = param.images
            this.top_video = param.top_video
            this.address = param.address
            this.follow = param.follow
            this.shop_info = param.shop_info
            this.shop_owner = param.shop_owner
            this.shop_owner_avatar = param.shop_owner_avatar
            this.like_num = param.like_num
            this.image = param.image
            this.goods = param.goods
        } catch (e) {
            throw new Exception(e, 'ShopsDetailInfoInterface interface attribute error')
        }
    }
}