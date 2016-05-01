import Block from './src/block';
import Instances from './src/instances';
import Events from './src/events';

let instances = new Instances();

export default {
  instances,
  wireEvents(emitter, monitoredEvents) {
    let events = new Events(instances, emitter, monitoredEvents);
    events.wire();
  }
};

export {Block as Block};
export {Instances as Instances};
export {Events as Events};
