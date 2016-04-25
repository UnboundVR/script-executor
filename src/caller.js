export default class Caller {
  constructor(objects) {
    this.objects = objects;
  }

  call(id, method, params) {
    return this.objects[id][method](params);
  }
}
