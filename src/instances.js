import extend from 'extend';
import Caller from './caller';

class Instances {
  constructor() {
    this.instances = {};
    this.caller = new Caller(this.instances);
  }

  set(id, prototype, data) {
    class Instance {};
    Instance.prototype = prototype;

    let instance = extend(new Instance(), data);

    this.instances[id] = prototype;
  }

  get(id) {
    return this.instances[id];
  }

  call(id, method, params) {
    return this.caller.call(id, method, params);
  }
}

export default Instances;
