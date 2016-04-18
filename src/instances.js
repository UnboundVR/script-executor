import extend from 'extend';
import Objects from './objects';

class Instances extends Objects {
  set(id, prototype, data) {
    class Instance {};
    Instance.prototype = prototype;

    let instance = extend(new Instance(), data);

    this.objects[id] = instance;
  }
}

export default Instances;
