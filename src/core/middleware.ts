import { readdirFilesAndLoad, jsReg } from '../utils';

export function initMiddleware(app, middlewarePath: string) {
  const mids = readdirFilesAndLoad(middlewarePath, jsReg);
  mids.forEach(middleware => app.use(middleware));
}
