"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class Log {
    router(method, path, prefix) {
        path = prefix ? `${prefix}${path}` : path;
        console.log(chalk.blue(`[router] ${method.toUpperCase()} - ${path}`));
    }
    request(method, url) {
        console.log(chalk.yellow(`[request] ${method} ${url}`));
    }
    response(method, url, time, status) {
        console.log(chalk.yellow(`[response] ${method} ${url} - ${time} ${status}`));
    }
}
exports.default = new Log();
