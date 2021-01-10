import 'reflect-metadata';

import { initController } from './controller';
import { initMiddleware } from './middleware';
import { initService } from './service';

import * as path from 'path';

import * as Koa from 'koa';
import { InitOptions, Server } from '../typing/mix-application';
import { processValue } from '../utils';

import { ListenOptions } from 'net';

export class MixApplication {
  public koa: Koa = new Koa();
  private options: InitOptions;

  constructor(options?: InitOptions) {
    this.options = options;

    this.processOptions();
    this.init();
  }

  listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
  listen(port: number, hostname?: string, listeningListener?: () => void): Server;
  listen(port: number, backlog?: number, listeningListener?: () => void): Server;
  listen(port: number, listeningListener?: () => void): Server;
  listen(path: string, backlog?: number, listeningListener?: () => void): Server;
  listen(path: string, listeningListener?: () => void): Server;
  listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
  listen(handle: any, listeningListener?: () => void): Server;
  listen(options: ListenOptions, listeningListener?: () => void): Server;

  public listen(...args: any[]) {
    return this.koa.listen.apply(this.koa, args);
  }

  private processOptions() {
    const options = (this.options = this.options || {});

    processValue(options, 'rootDir', process.cwd());
    const root = options.rootDir;
    processValue(options, 'controllerPath', path.resolve(root, './src/controller'));
    processValue(options, 'middlewarePath', path.resolve(root, './src/middleware'));
    processValue(options, 'servicePath', path.resolve(root, './src/service'));
    processValue(options, 'disableBuiltInMiddleware', false);
  }

  private init() {
    const app = this.koa;
    const { controllerPath, middlewarePath, servicePath, disableBuiltInMiddleware } = this.options;

    initService(app, servicePath);
    if (!disableBuiltInMiddleware) {
      initMiddleware(app, path.join(__dirname, '../middleware'));
    }
    initMiddleware(app, middlewarePath);
    initController(app, controllerPath, this.options.koaBodyOption);
  }
}

export class ApplicationService {};
