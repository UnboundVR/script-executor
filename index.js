import Prototypes from './src/prototypes';
import Instances from './src/instances';
import Events from './src/events';

let prototypes = new Prototypes();
let instances = new Instances();

export default {
  prototypes,
  instances,
  wireEvents(emitter, monitoredEvents) {
    let events = new Events(instances);
    events.wire(emitter, monitoredEvents);
  }
};
