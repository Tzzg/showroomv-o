import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class HelpListInterface extends Interface {
    total_number;
    list;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new HelpListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'HelpListInterface interface attribute error')
        }
    }
}

export class HelpListInfoInterface extends Interface {
    id;
    title;
    text;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.text = param.text
        } catch (e) {
            throw new Exception(e, 'HelpListInfoInterface interface attribute error')
        }
    }
}