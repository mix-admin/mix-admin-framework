"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initService = void 0;
const constant_1 = require("../constant");
const utils_1 = require("../utils");
function getServices(servicePath) {
    const files = [];
    utils_1.readdir(servicePath, (filename) => {
        if (!utils_1.isJsFile(filename)) {
            return;
        }
        const result = utils_1.loadJs(filename);
        Reflect.defineMetadata(constant_1.SERVICE_PATH_KEY, filename, result);
        const same = files.find((service) => service.name === result.name);
        if (same) {
            console.log('[Framework Error]: Service的名称必须是唯一的: "' + result.name + '"：\n' +
                '> ' + Reflect.getMetadata(constant_1.SERVICE_PATH_KEY, same) + '\n' +
                '> ' + filename);
            process.exit(1);
        }
        files.push(result);
    });
    return files;
}
function getCtxServices() {
    return Reflect.getMetadata(constant_1.SERVICE_CTX_KEY, Object) || [];
}
function generatorServiceGetter(ctx, services, ctxServiceNames) {
    return new Proxy({}, {
        get: (obj, prop) => {
            if (!obj[prop]) {
                const serviceName = prop.charAt(0).toUpperCase() + prop.slice(1, prop.length);
                const Service = services.find((service) => service.name === serviceName);
                if (Service) {
                    const instance = new Service();
                    if (ctxServiceNames.includes(Service.name)) {
                        instance.ctx = ctx;
                    }
                    obj[prop] = instance;
                }
            }
            return obj[prop];
        },
    });
}
function initService(app, servicePath) {
    const services = getServices(servicePath);
    const ctxServiceNames = getCtxServices();
    app.use(async (ctx, next) => {
        ctx.service = generatorServiceGetter(ctx, services, ctxServiceNames);
        await next();
    });
}
exports.initService = initService;
