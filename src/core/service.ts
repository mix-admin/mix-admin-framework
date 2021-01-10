import { SERVICE_PATH_KEY, SERVICE_CTX_KEY } from '../constant';
import { isJsFile, readdir, loadJs } from '../utils';

function getServices(servicePath: string) {
  const files = [];
  readdir(servicePath, (filename: string) => {
    if (!isJsFile(filename)) {
      return;
    }
    const result = loadJs(filename);
    Reflect.defineMetadata(SERVICE_PATH_KEY, filename, result);
    const same = files.find((service) => service.name === result.name);
    if (same) {
      console.log(
        '[Framework Error]: Service的名称必须是唯一的: "' + result.name + '"：\n' +
        '> ' + Reflect.getMetadata(SERVICE_PATH_KEY, same) + '\n' +
        '> ' + filename
      );
      process.exit(1);
    }

    files.push(result);
  })
  
  return files;
}

function getCtxServices(): string[] {
  return Reflect.getMetadata(SERVICE_CTX_KEY, Object) || [];
}

function generatorServiceGetter(ctx, services, ctxServiceNames) {
  return new Proxy(
    {},
    {
      get: (obj, prop: string) => {
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
    }
  );
}

export function initService(app, servicePath: string) {
  const services = getServices(servicePath);
  const ctxServiceNames = getCtxServices();

  app.use(async (ctx, next) => {
    ctx.service = generatorServiceGetter(ctx, services, ctxServiceNames);
    await next();
  })  
}
