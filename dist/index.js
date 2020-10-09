"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hexabase = exports.HexabaseSdkError = void 0;
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(e) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, e) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return BaseError;
}(Error));
var HexabaseSdkError = /** @class */ (function (_super) {
    __extends(HexabaseSdkError, _super);
    function HexabaseSdkError(e) {
        return _super.call(this, e) || this;
    }
    return HexabaseSdkError;
}(BaseError));
exports.HexabaseSdkError = HexabaseSdkError;
var Hexabase = /** @class */ (function () {
    function Hexabase(options) {
        this.options = {};
        if (options !== undefined) {
            this.options = options;
        }
    }
    Hexabase.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var usingSsl = _this.options.protocol === 'https';
            var httpModule = usingSsl ? https_1.default : http_1.default;
            var params = {
                email: email,
                password: password
            };
            var options = {
                host: _this.options.host,
                port: _this.options.port,
                path: _this.options.path + "/login",
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            var req = httpModule.request(options, function (res) {
                if (res.statusCode == 200) {
                    _this.console("login successfull");
                    res.on('data', function (chunk) {
                        _this.console("login response data:" + chunk);
                        resolve(JSON.parse(chunk).token);
                    });
                }
                else {
                    _this.console("login failed. statusCode:" + res.statusCode);
                    reject(new HexabaseSdkError('login failed'));
                }
            });
            req.on('error', function (err) {
                _this.console("login error:[" + err + "]");
                reject(err);
            });
            req.write(JSON.stringify(params));
            // req.setTimeout(this.options.timeout || 2000 * 60, () => {
            //   reject(new HexabaseSdkError('request timeout'));
            // });
            req.end();
        });
    };
    Hexabase.prototype.console = function (msg) {
        if (this.options.debug) {
            console.info(msg);
        }
    };
    return Hexabase;
}());
exports.Hexabase = Hexabase;
