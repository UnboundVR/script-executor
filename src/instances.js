import extend from 'extend';
import Objects from './objects';

export default class Instances extends Objects {
  set(id, prototype, data) {
    class Instance {};
    Instance.prototype = prototype;

    let instance = extend(true, new Instance(), data);

    this.objects[id] = instance;
  }
}
