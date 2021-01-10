"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = exports.MixApplication = void 0;
require("reflect-metadata");
const controller_1 = require("./controller");
const middleware_1 = require("./middleware");
const service_1 = require("./service");
const path = require("path");
const Koa = require("koa");
const utils_1 = require("../utils");
class MixApplication {
    constructor(options) {
        this.koa = new Koa();
        this.options = options;
        this.processOptions();
        this.init();
    }
    listen(...args) {
        return this.koa.listen.apply(this.koa, args);
    }
    processOptions() {
        const options = (this.options = this.options || {});
        utils_1.processValue(options, 'rootDir', process.cwd());
        const root = options.rootDir;
        utils_1.processValue(options, 'controllerPath', path.resolve(root, './src/controller'));
        utils_1.processValue(options, 'middlewarePath', path.resolve(root, './src/middleware'));
        utils_1.processValue(options, 'servicePath', path.resolve(root, './src/service'));
        utils_1.processValue(options, 'disableBuiltInMiddleware', false);
    }
    init() {
        const app = this.koa;
        const { controllerPath, middlewarePath, servicePath, disableBuiltInMiddleware } = this.options;
        service_1.initService(app, servicePath);
        if (!disableBuiltInMiddleware) {
            middleware_1.initMiddleware(app, path.join(__dirname, '../middleware'));
        }
        middleware_1.initMiddleware(app, middlewarePath);
        controller_1.initController(app, controllerPath, this.options.koaBodyOption);
    }
}
exports.MixApplication = MixApplication;
class ApplicationService {
}
exports.ApplicationService = ApplicationService;
;
