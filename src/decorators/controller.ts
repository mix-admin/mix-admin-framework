import { CONTROLLER_KEY } from '../constant';

export const controller = () => {
  return (Target: Object) => {
    const controllers = Reflect.getMetadata(CONTROLLER_KEY, Object) || [];
    controllers.push(Target);
    Reflect.defineMetadata(CONTROLLER_KEY, controllers, Object);
  };
};
