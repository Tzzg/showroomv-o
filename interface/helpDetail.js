import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class HelpInfoInterface extends Interface {
    id;
    title;
    body;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.body = param.body
        } catch (e) {
            throw new Exception(e, 'HelpInfoInterface interface attribute error')
        }
    }
}