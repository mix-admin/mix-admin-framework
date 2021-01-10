"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
};
