import Instances from './src/instances';
import Events from './src/events';
import Classes from './src/classes';
import classLoader from './src/classLoader';
import Queue from 'promise-queue';
let queue = new Queue(1, Infinity)

export default class ScriptExecutor {
  constructor() {
    this.instances = new Instances();
    this.classes = new Classes(classLoader, queue);
  }

  createInstance(id, ctorId, options) {
    let ctor = classes.get(ctorId);
    this.instances.create(id, ctor, options);
  }

  getInstance(id) {
    return this.instances.get(id);
  }

  removeInstance(id) {
    this.instances.remove(id);
  }

  async loadClass(id, code) {
    await this.classes.load(id, code);
  }

  wireEvents(emitter, monitoredEvents) {
    let events = new Events(this.instances, emitter, monitoredEvents);
    events.wire();
  }
};
