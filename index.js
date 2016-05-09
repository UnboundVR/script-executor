import Instances from './src/instances';
import Events from './src/events';
import Classes from './src/classes';
import classLoader from './src/classLoader';

export default class ScriptExecutor {
  constructor() {
    this.instances = new Instances();
    this.classes = new Classes(classLoader);
  }

  createInstance(id, ctorId, options) {
    let ctor = classes.get(ctorId);
    instances.create(id, ctor, options);
  }

  getInstance(id) {
    return instances.get(id);
  }

  removeInstance(id) {
    instances.remove(id);
  }

  async loadClass(id, code) {
    await classes.load(id, code);
  }

  wireEvents(emitter, monitoredEvents) {
    let events = new Events(instances, emitter, monitoredEvents);
    events.wire();
  }
};
