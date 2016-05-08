export default class Classes {
  constructor(load) {
    this._load = load;
    this.classes = {};
  }

  async load(id, code) {
    let ctor = await this._load(code);

    if(typeof ctor != 'function') {
      throw new Error('Code must be a function');
    }

    this.classes[id] = ctor;
  }

  get(id) {
    return this.classes[id];
  }
}
