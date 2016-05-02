import extend from 'extend';

export default class Instances {
  constructor() {
    this.instances = {};
  }

  create(id, $class, options) {
    options = options || {};

    let world = extend(true, {}, options.world);
    let data = extend(true, {}, options.data);

    this.instances[id] = new $class(world, data);
  }

  get(id) {
    return this.instances[id];
  }

  remove(id) {
    delete this.instances[id];
  }

  getAllIDs() {
    return Object.keys(this.instances);
  }
}
