"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processValue = exports.readdirFilesAndLoad = exports.readdirAndLoad = exports.readdirFiles = exports.readdir = exports.loadJs = exports.isJsFile = exports.jsReg = void 0;
const fs = require("fs");
exports.jsReg = /\.[j|t]s$/;
const isJsFile = (filename) => {
    return exports.jsReg.test(filename);
};
exports.isJsFile = isJsFile;
const loadJs = (filepath) => {
    const vb = require(filepath);
    if (vb.default) {
        return vb.default;
    }
    return vb;
};
exports.loadJs = loadJs;
const readdir = (filepath, callback) => {
    const stats = validatePath(filepath);
    if (!stats) {
        return;
    }
    if (stats.isDirectory()) {
        const files = fs.readdirSync(filepath);
        files.forEach((filename) => {
            exports.readdir(filepath + "/" + filename, callback);
        });
    }
    else {
        callback && callback(filepath);
    }
};
exports.readdir = readdir;
const readdirFiles = (filepath) => {
    const files = [];
    exports.readdir(filepath, (filename) => {
        files.push(filename);
    });
    return files;
};
exports.readdirFiles = readdirFiles;
const readdirAndLoad = (filepath, callback, reg) => {
    exports.readdir(filepath, (filename) => {
        if (reg && !reg.test(filename)) {
            return;
        }
        callback(filename);
    });
};
exports.readdirAndLoad = readdirAndLoad;
const readdirFilesAndLoad = (filepath, reg) => {
    const files = [];
    exports.readdir(filepath, (filename) => {
        if (reg && !reg.test(filename)) {
            return;
        }
        files.push(exports.loadJs(filename));
    });
    return files;
};
exports.readdirFilesAndLoad = readdirFilesAndLoad;
const processValue = (obj, key, value) => {
    if (obj[key] === void 0) {
        obj[key] = value;
    }
};
exports.processValue = processValue;
function validatePath(path) {
    try {
        return fs.lstatSync(path);
    }
    catch (err) {
        return null;
    }
}
