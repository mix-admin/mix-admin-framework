import { SERVICE_CTX_KEY } from '../constant';

export const ctx = () => {
  return (Target: Function) => {
    const targets = Reflect.getMetadata(SERVICE_CTX_KEY, Object) || [];
    const name = Target.name;
    if (!targets.includes(name)) {
      targets.push(name);
      Reflect.defineMetadata(SERVICE_CTX_KEY, targets, Object);
    }
  }
}
