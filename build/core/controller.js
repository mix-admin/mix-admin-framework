"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initController = void 0;
const Router = require("koa-router");
const KoaBody = require("koa-body");
const constant_1 = require("../constant");
const utils_1 = require("../utils");
const log_1 = require("../utils/log");
const routers = [];
function processController(controllerPath, koaBodyOption = {}) {
    utils_1.readdirFilesAndLoad(controllerPath, utils_1.jsReg);
    const controllers = Reflect.getMetadata(constant_1.CONTROLLER_KEY, Object) || [];
    controllers.forEach(Target => {
        const target = new Target();
        const routes = Reflect.getMetadata(constant_1.ROUTER_KEY, Target) || [];
        const prefix = Reflect.getMetadata(constant_1.PREFIX_KEY, Target) || '';
        const router = new Router({
            prefix
        });
        routers.push(router);
        routes.forEach(route => {
            const { method, path, property } = route;
            log_1.default.router(method, path, prefix);
            if (/[post|put|delete|del]/.test(method)) {
                router[method](path, KoaBody(koaBodyOption), target[property]);
            }
            else {
                router[method](path, target[property]);
            }
        });
    });
}
const initController = (app, controllerPath, koaBodyOption) => {
    processController(controllerPath, koaBodyOption);
    routers.forEach(router => {
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
};
exports.initController = initController;
