import Caller from './caller';

export default class Objects {
  constructor() {
    this.objects = {};
    this.caller = new Caller(this.objects);
  }

  get(id) {
    return this.objects[id];
  }

  hasMethod(id, method) {
    return !!this.objects[id][method];
  }

  getAllIds() {
    return Object.keys(this.objects);
  }

  call(id, method, params) {
    return this.caller.call(id, method, params);
  }
}
