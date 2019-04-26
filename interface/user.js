import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class UserSelfInterface extends Interface {
    id;
    username;
    phone;
    profile;
    assets;

    constructor(param) {
        super()
        try {
            console.log(param)
            this.id = param.info.id
            this.nickname = param.info.nickname
            this.username = param.info.username
            this.profile = param.info.profile
            this.assets = param.info.assets
        } catch (e) {
            throw new Exception(e, 'UserSelfInterface interface attribute error')
        }
    }
}

export class UserAccessTokenInterface extends Interface {
    jti;
    iss;
    sub;
    iat;
    exp;

    constructor(param) {
        super()
        try {
            this.jti = param.jti
            this.iss = param.iss
            this.sub = param.sub
            this.iat = param.iat
            this.exp = param.exp
        } catch (e) {
            throw new Exception(e, 'UserAccessTokenInterface interface attribute error')
        }
    }
}

export class UserTokenInfoInterface extends Interface {
    access_token;
    expires_in;

    constructor(param) {
        super()
        try {
            this.access_token = param.access_token
            this.expires_in = param.nickname
        } catch (e) {
            throw new Exception(e, 'TokenInfoInterface interface attribute error')
        }
    }
}

export class UserEvaluatedListInterface extends Interface {
    constructor(param) {
        super()
    }
}

export class UserCertInfoInterface extends Interface {
    cert_code;
    real_name;
    images;

    constructor(param) {
        super()
        try {
            this.cert_code = param.cert_code
            this.real_name = param.real_name
            this.images = param.images

        } catch (e) {
            throw new Exception(e, 'UserCertInfoInterface interface attribute error')
        }
    }
}

export class UserProfileInfoInterface extends Interface {
    avatar;
    nickname;
    birth;
    gender;

    constructor(param) {
        super()
        try {
            this.avatar = param.avatar
            this.nickname = param.nickname
            this.birth = param.birth
            this.gender = param.gender
        } catch (e) {
            throw new Exception(e, 'UserProfileInfoInterface interface attribute error')
        }
    }
}

export class UserPolicyInterface extends Interface {
    agree_policy;

    constructor(param) {
        super()
        try {
            this.agree_policy = param.agree_policy
        } catch (e) {
            throw new Exception(e, 'UserPolicyAgreeInterface interface attribute error')
        }
    }
}