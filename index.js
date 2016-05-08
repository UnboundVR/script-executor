import Instances from './src/instances';
import Events from './src/events';
import Classes from './src/classes';
import loadClass from './src/classes/loadClass';

let instances = new Instances();
let classes = new Classes(loadClass);

export default {
  async createInstance(id, ctorId, options) {
    let ctor = classes.get(ctorId);
    instances.create(id, ctor, options);
  },
  getInstance: instances.get.bind(instances),
  removeInstance: instances.remove.bind(instances),
  loadClass: classes.load.bind(classes),
  wireEvents(emitter, monitoredEvents) {
    let events = new Events(instances, emitter, monitoredEvents);
    events.wire();
  }
};

export {Instances as Instances};
export {Events as Events};
export {Classes as Classes};
