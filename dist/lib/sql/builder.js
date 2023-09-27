"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HexabaseBuilder {
    constructor(client) {
        this.client = client;
        this.url = new URL(this.client.urlHxb);
    }
}
exports.default = HexabaseBuilder;
//# sourceMappingURL=builder.js.map