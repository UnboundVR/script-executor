export default class Classes {
  constructor(loader) {
    this._load = loader;
    this.classes = {};
  }

  async load(id, code) {
    let ctor = await this._load(code);

    if(typeof ctor != 'function') {
      throw new Error('Code must declare a constructor - therefore it must be a function');
    }

    this.classes[id] = ctor;
  }

  get(id) {
    return this.classes[id];
  }
}
