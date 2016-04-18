class Events {
  constructor(emitter, monitoredEvents, objects) {
    this.emitter = emitter;
    this.monitoredEvents = monitoredEvents;
    this.objects = objects;
  }

  wire() {
    for(let e of this.monitoredEvents) {
      let self = this;
      this.emitter.on(e, (payload, filter) => {
        filter = filter || {};
        for(let id of self.objects.getAllIds()) {
          if(!filter.id || filter.id == id) {
            let method = `on${e}`;
            self.objects.hasMethod(id, method) && self.objects.call(id, method, payload);
          }
        }
      });
    }
  }
}

export default Events;
