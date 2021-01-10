import log from '../utils/log';

export default async (ctx, next) => {
  const { method, url } = ctx;
  log.request(method, url);
  await next();
  const rt = ctx.response.get('X-Response-Time');
  log.response(method, url, rt, ctx.response.status);
}
