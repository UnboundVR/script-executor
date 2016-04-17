import extend from 'extend';
import Caller from './caller';

class Prototypes {
  constructor() {
    this.prototypes = {};
    this.caller = new Caller(this.prototypes);
  }

  set(id, code, options) {
    options = options || {};

    let prototype = extend({}, options.data || {});
    eval('(' + code + ')').bind(prototype)(options.world);

    this.prototypes[id] = prototype;
  }

  get(id) {
    return this.prototypes[id];
  }

  call(id, method, params) {
    return this.caller.call(id, method, params);
  }
}

export default Prototypes;
