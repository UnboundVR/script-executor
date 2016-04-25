export default class Events {
  constructor(objects) {
    this.objects = objects;
  }

  _invokeHandler(e, objId, payload) {
    let method = `on${e}`;
    this.objects.hasMethod(objId, method) && this.objects.call(objId, method, payload);
  }

  wire(emitter, monitoredEvents) {
    for(let e of monitoredEvents) {
      emitter.on(e, ((payload, filter) => {
        filter = filter || ((obj, id) => true);
        for(let id of this.objects.getAllIds()) {
          let obj = this.objects.get(id);
          filter(obj, id) && this._invokeHandler(e, id, payload);
        }
      }).bind(this));
    }
  }
}
