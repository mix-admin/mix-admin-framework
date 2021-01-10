import { ROUTER_KEY } from '../constant';

enum Method {
  Get = "get",
  Post = "post",
  Delete = "delete",
  Put = "put",
  Options = "OPTIONS",
  Head = "HEAD",
}

function define(method: Method, path: string, proto: Object, attr: string) {
  const Target = proto.constructor;

  const routes = Reflect.getMetadata(ROUTER_KEY, Target) || [];

  routes.push({
    method,
    path,
    property: attr,
  });

  Reflect.defineMetadata(ROUTER_KEY, routes, Target);
}

export function get(route: string) {
  return function (proto: Object, attr: string) {
    define(Method.Get, route, proto, attr);
  };
}

export function post(route: string) {
  return function(proto: Object, attr: string) {
    define(Method.Post, route, proto, attr);
  }
}

export function del(route: string) {
  return function(proto: Object, attr: string) {
    define(Method.Delete, route, proto, attr);
  }
}

export function put(route: string) {
  return function(proto: Object, attr: string) {
    define(Method.Put, route, proto, attr);
  }
}
