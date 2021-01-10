"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctx = void 0;
const constant_1 = require("../constant");
const ctx = () => {
    return (Target) => {
        const targets = Reflect.getMetadata(constant_1.SERVICE_CTX_KEY, Object) || [];
        const name = Target.name;
        if (!targets.includes(name)) {
            targets.push(name);
            Reflect.defineMetadata(constant_1.SERVICE_CTX_KEY, targets, Object);
        }
    };
};
exports.ctx = ctx;
