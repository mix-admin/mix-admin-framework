"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../utils/log");
exports.default = async (ctx, next) => {
    const { method, url } = ctx;
    log_1.default.request(method, url);
    await next();
    const rt = ctx.response.get('X-Response-Time');
    log_1.default.response(method, url, rt, ctx.response.status);
};
