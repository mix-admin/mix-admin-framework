"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
const constant_1 = require("../constant");
const prefix = (name) => {
    return (Target) => {
        Reflect.defineMetadata(constant_1.PREFIX_KEY, name, Target);
    };
};
exports.prefix = prefix;
