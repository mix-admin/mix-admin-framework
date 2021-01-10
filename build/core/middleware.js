"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMiddleware = void 0;
const utils_1 = require("../utils");
function initMiddleware(app, middlewarePath) {
    const mids = utils_1.readdirFilesAndLoad(middlewarePath, utils_1.jsReg);
    mids.forEach(middleware => app.use(middleware));
}
exports.initMiddleware = initMiddleware;
