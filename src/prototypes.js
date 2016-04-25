import extend from 'extend';
import Objects from './objects';

export default class Prototypes extends Objects {
  set(id, code, options) {
    options = options || {};

    let prototype = extend(true, {}, options.data || {});
    eval(`(${code})`).bind(prototype)(options.world);

    this.objects[id] = prototype;
  }
}
