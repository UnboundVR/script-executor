export default class Classes {
  constructor(loader, queue) {
    this._load = loader;
    this.classes = {};
    this.queue = queue;
  }

  async load(id, code) {
    let ctor = await this.queue.add(() => this._load(code));

    if(typeof ctor != 'function') {
      throw new Error('Code must declare a constructor - therefore it must be a function');
    }

    this.classes[id] = ctor;
  }

  get(id) {
    return this.classes[id];
  }
}
