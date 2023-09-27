"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../graphql/user");
const HxbAbstract_1 = require("../../../HxbAbstract");
const workspace_1 = __importDefault(require("../workspace"));
class User extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'user_name':
            case 'username':
                this.userName = value;
                break;
            case 'access_key':
                this.accessKey = value;
                break;
            case 'email':
                this.email = value;
                break;
            case 'user_id':
            case 'u_id':
                this.id = value;
                break;
            case 'profile_pic':
                this.profilePicture = value;
                break;
            case 'current_workspace_id':
                this.currentWorkspace = new workspace_1.default(value);
                break;
            case 'is_ws_admin':
                this.isWorkspaceAdmin = value;
                break;
            case 'media_link':
                this.mediaLink = value;
                break;
            case 'user_roles':
                break;
        }
        return this;
    }
    static register(confirmationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(user_1.USER_REGISTER, { confirmationId });
            return new User(res.userRegister.user);
        });
    }
    static registerConfirm(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.rest('post', '/api/v0/users/registration/confirm', {}, params);
            return res.token;
        });
    }
    passwordExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(user_1.USER_PASSWORD_EXPIRY);
            return res.userPasswordExpiry.is_expired;
        });
    }
    static confirm(confirmationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(user_1.USER_CONFIRMATIONS, { confirmationId });
            return res.userConfirmations.user;
        });
    }
    static current() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(user_1.USER_INFO);
            const user = User.fromJson(res.userInfo);
            return user;
        });
    }
    invite(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                postInviteUsers: undefined,
                error: undefined,
            };
            try {
                const res = yield this.request(user_1.POST_INVITE_USERS, { payload });
                data.postInviteUsers = res === null || res === void 0 ? void 0 : res.postInviteUsers;
            }
            catch (error) {
                data.error = JSON.stringify(error.response.errors);
            }
            return data;
        });
    }
}
exports.default = User;
//# sourceMappingURL=index.js.map