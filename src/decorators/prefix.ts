import { PREFIX_KEY } from '../constant';

export const prefix = (name: string) => {
  return (Target: Object) => {
    Reflect.defineMetadata(PREFIX_KEY, name, Target);
  }
}
