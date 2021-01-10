"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.post = exports.get = void 0;
const constant_1 = require("../constant");
var Method;
(function (Method) {
    Method["Get"] = "get";
    Method["Post"] = "post";
    Method["Delete"] = "delete";
    Method["Put"] = "put";
    Method["Options"] = "OPTIONS";
    Method["Head"] = "HEAD";
})(Method || (Method = {}));
function define(method, path, proto, attr) {
    const Target = proto.constructor;
    const routes = Reflect.getMetadata(constant_1.ROUTER_KEY, Target) || [];
    routes.push({
        method,
        path,
        property: attr,
    });
    Reflect.defineMetadata(constant_1.ROUTER_KEY, routes, Target);
}
function get(route) {
    return function (proto, attr) {
        define(Method.Get, route, proto, attr);
    };
}
exports.get = get;
function post(route) {
    return function (proto, attr) {
        define(Method.Post, route, proto, attr);
    };
}
exports.post = post;
function del(route) {
    return function (proto, attr) {
        define(Method.Delete, route, proto, attr);
    };
}
exports.del = del;
function put(route) {
    return function (proto, attr) {
        define(Method.Put, route, proto, attr);
    };
}
exports.put = put;
