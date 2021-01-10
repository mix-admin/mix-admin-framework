import { ListenOptions } from "net";
import Http = require("http");
import Https = require("https");

import * as Koa from "koa";
import * as KoaBody from "koa-body";

export type Server = Http.Server | Https.Server;

declare module "mix-admin-framework" {
  interface Service {
    [key: string]: any;
  }

  export class MixApplication {
    public koa: Koa;

    constructor(options?: InitOptions);
    
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
    listen(handle: any, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
  }

  export interface Context extends Koa.Context {
    service: Service;
  }

  export class ApplicationService {
    public readonly ctx: Context;
  }

  type MethodDecoratorFunc = (path: string) => MethodDecorator;
  type PrefixClassDecoratorFunc = (path: string) => ClassDecorator;

  export const get: MethodDecoratorFunc;
  export const post: MethodDecoratorFunc;
  export const del: MethodDecoratorFunc;
  export const put: MethodDecoratorFunc;
  export const prefix: PrefixClassDecoratorFunc;
  export const controller: () => ClassDecorator;
  export const ctx: () => ClassDecorator;
}

export interface InitOptions {
  /**
   * 项目根目录
   * default: process.cwd()
   */
  rootDir?: string;
  /**
   * controller目录
   * default: rootDir + '/src/controller'
   */
  controllerPath?: string;
  /**
   * service目录
   * default: rootDir + '/src/controller'
   */
  servicePath?: string;
  /**
   * middleware目录
   * default: rootDir + '/src/middleware'
   */
  middlewarePath?: string;
  /**
   * KoaBody 的初始化参数
   */
  koaBodyOption?: KoaBody.IKoaBodyOptions;
  /**
   * 是否禁用内置的中间件
   */
  disableBuiltInMiddleware?: boolean;
}
