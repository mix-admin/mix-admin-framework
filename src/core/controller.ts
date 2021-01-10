import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as KoaBody from 'koa-body';

import { CONTROLLER_KEY, ROUTER_KEY, PREFIX_KEY } from '../constant';
import { readdirFilesAndLoad, jsReg } from '../utils';

import log from '../utils/log';

const routers: Router[] = [];

function processController(controllerPath: string, koaBodyOption: KoaBody.IKoaBodyOptions = {}) {
  readdirFilesAndLoad(controllerPath, jsReg);

  const controllers = Reflect.getMetadata(CONTROLLER_KEY, Object) || [];

  controllers.forEach(Target => {
    const target = new Target();
    const routes = Reflect.getMetadata(ROUTER_KEY, Target) || [];
    const prefix = Reflect.getMetadata(PREFIX_KEY, Target) || '';
    const router = new Router({
      prefix
    });

    routers.push(router);

    routes.forEach(route => {
      const { method, path, property } = route;
      log.router(method, path, prefix);
      if (/[post|put|delete|del]/.test(method)) {
        router[method](path, KoaBody(koaBodyOption), target[property]);
      } else {
        router[method](path, target[property]);
      }
    })
  })
}

export const initController = (app: Koa, controllerPath: string, koaBodyOption?: KoaBody.IKoaBodyOptions) => {
  processController(controllerPath, koaBodyOption);

  routers.forEach(router => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}
