import extend from 'extend';
import Objects from './objects';

class Prototypes extends Objects {
  set(id, code, options) {
    options = options || {};

    let prototype = extend({}, options.data || {});
    eval(`(${code})`).bind(prototype)(options.world);

    this.objects[id] = prototype;
  }
}

export default Prototypes;
