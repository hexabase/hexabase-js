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
const HexabaseClient_1 = __importDefault(require("../../../HexabaseClient"));
require('dotenv').config();
const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.DEV_WORKSPACE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new HexabaseClient_1.default({ env: 'dev' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token });
    yield client.setWorkspace(workspaceId);
}));
describe('#getReports()', () => {
    it('should get reports in project', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers('legacy');
        const project = yield client.currentWorkspace.project(projectId);
        const reports = yield project.reports();
        expect(typeof reports[0].id).toBe('string');
    }));
});
describe('#getReportData()', () => {
    it('should get reports in project', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield client.currentWorkspace.project(projectId);
        const reports = yield project.reports();
        const report = reports[0];
        const data = yield report.data();
        console.log(data);
        expect(data.length > 0).toBe(true);
        expect(typeof data[0].i_id).toBe('string');
    }));
});
//# sourceMappingURL=report.test.js.map