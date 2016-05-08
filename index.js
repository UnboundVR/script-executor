import Instances from './src/instances';
import Events from './src/events';
import Classes from './src/classes';

let instances = new Instances();
let classes;

export default {
  setClassLoader(loader) {
    classes = new Classes(loader);
  },
  async createInstance(id, ctorId, options) {
    if(!classes) {
      throw new Error('Class loader is not set');
    }

    let ctor = classes.get(ctorId);
    instances.create(id, ctor, options);
  },
  getInstance: instances.get.bind(instances),
  removeInstance: instances.remove.bind(instances),
  loadClass(id, code) {
    if(!classes) {
      throw new Error('Class loader is not set');
    }

    return classes.load(id, code);
  },
  wireEvents(emitter, monitoredEvents) {
    let events = new Events(instances, emitter, monitoredEvents);
    events.wire();
  }
};

export {Instances as Instances};
export {Events as Events};
export {Classes as Classes};
