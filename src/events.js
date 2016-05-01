export default class Events {
  constructor(instances, emitter, monitoredEvents) {
    this.instances = instances;
    this.emitter = emitter;
    this.monitoredEvents = monitoredEvents;
  }

  _capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _invokeHandler(instance, eventName, payload) {
    let normalizedEventName = this._capitalizeFirst(eventName);
    let methodName = `on${normalizedEventName}`;

    let method = instance[methodName];

    method && method(payload);
  }

  wire() {
    for(let eventName of this.monitoredEvents) {
      this.emitter.on(eventName, (payload, filter) => {
        filter = filter || (() => true);
        for(let id of this.instances.getAllIDs()) {
          let instance = this.instances.get(id);
          filter(instance) && this._invokeHandler(instance, eventName, payload);
        }
      });
    }
  }

}
