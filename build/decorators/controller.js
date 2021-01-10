"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const constant_1 = require("../constant");
const controller = () => {
    return (Target) => {
        const controllers = Reflect.getMetadata(constant_1.CONTROLLER_KEY, Object) || [];
        controllers.push(Target);
        Reflect.defineMetadata(constant_1.CONTROLLER_KEY, controllers, Object);
    };
};
exports.controller = controller;
