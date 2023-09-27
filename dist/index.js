"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.FileObject = exports.Workspace = exports.User = exports.HexabaseSQL = exports.Report = exports.Project = exports.Item = exports.Hexabase = exports.HexabaseClient = exports.createClient = void 0;
const HexabaseClient_1 = __importDefault(require("./HexabaseClient"));
exports.HexabaseClient = HexabaseClient_1.default;
const HexabaseClient_2 = __importDefault(require("./HexabaseClient"));
exports.Hexabase = HexabaseClient_2.default;
const auth_1 = __importDefault(require("./lib/packages/auth"));
const item_1 = __importDefault(require("./lib/packages/item"));
exports.Item = item_1.default;
const project_1 = __importDefault(require("./lib/packages/project"));
exports.Project = project_1.default;
const report_1 = __importDefault(require("./lib/packages/report"));
exports.Report = report_1.default;
const sql_1 = __importDefault(require("./lib/sql"));
exports.HexabaseSQL = sql_1.default;
const user_1 = __importDefault(require("./lib/packages/user"));
exports.User = user_1.default;
const workspace_1 = __importDefault(require("./lib/packages/workspace"));
exports.Workspace = workspace_1.default;
const fileObject_1 = __importDefault(require("./lib/packages/fileObject"));
exports.FileObject = fileObject_1.default;
const createClient = ({ url = 'https://graphql.hexabase.com/graphql', token, email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.default(url);
    if (!token || (!email && !password)) {
        throw Error('Need token or email and password to initialize sdk');
    }
    const tokenHx = (email && password) ? yield auth.login({ email, password }) : token;
    const client = new HexabaseClient_1.default({ url });
    yield client.setToken(tokenHx);
    return client;
});
exports.createClient = createClient;
__exportStar(require("./lib/types"), exports);
//# sourceMappingURL=index.js.map