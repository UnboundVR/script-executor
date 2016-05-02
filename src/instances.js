import clone from 'clone';

export default class Instances {
  constructor() {
    this.instances = {};
  }

  create(id, $class, options) {
    options = options || {};

    let api = clone(options.api);
    let metadata = clone(options.metadata);

    let instance = new $class(api, metadata);

    this.instances[id] = {
      instance,
      metadata: options.metadata // store unaltered original
    };
  }

  _exists(id) {
    return !! this.instances[id];
  }

  get(id) {
    return this._exists(id) && this.instances[id].instance;
  }

  getMetadata(id) {
    return this._exists(id) && this.instances[id].metadata;
  }

  remove(id) {
    delete this.instances[id];
  }

  getAllIDs() {
    return Object.keys(this.instances);
  }
}
