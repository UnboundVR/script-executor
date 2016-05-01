import Events from '../src/events';
import sinon from 'sinon';

const EventEmitter = require('events');
import jasmineSinon from 'jasmine-sinon';

let events;
let emitter;
let instances;
let monitoredEvents;

class InstancesStub {
  constructor() {
    this.instances = {};
  }

  getAllIDs() {
    return Object.keys(this.instances);
  }

  create(id, stuff) {
    this.instances[id] = stuff;
  }

  get(id) {
    return this.instances[id];
  }
}

beforeEach(() => {
  monitoredEvents = ['someEvent'];
  instances = new InstancesStub();
  emitter = new EventEmitter();
  events = new Events(instances, emitter, monitoredEvents);
});

describe('events', () => {
  describe('wire', () => {
    it('should call appropriate methods in instances and not fail if other instances do not handle the event', (done) => {
      instances.create('some-id', {
        onSomeEvent: done
      });
      instances.create('some-other-id', {});

      events.wire();

      emitter.emit('someEvent');
    });

    it('should pass the first event parameter as payload', (done) => {
      instances.create('some-id', {
        onSomeEvent(payload) {
          expect(payload.someValue).toBe(SOME_VALUE);
          done();
        }
      });

      events.wire();

      const SOME_VALUE = 'someValue';
      let payload = {
        someValue: SOME_VALUE
      };

      emitter.emit('someEvent', payload);
    });

    it('should use the second parameter as a filter function', () => {
      const THIS_ONE = 'thisOne';

      let goodHandler = sinon.spy();
      let badHandler = sinon.spy();

      instances.create('some-id', {
        onSomeEvent: goodHandler,
        someAttribute: THIS_ONE
      });

      instances.create('some-other-id', {
        onSomeEvent: badHandler,
        someAttribute: 'notThisOne'
      });

      events.wire();
      emitter.emit('someEvent', {}, obj => obj.someAttribute == THIS_ONE);

      expect(goodHandler).toHaveBeenCalled();
      expect(badHandler).not.toHaveBeenCalled();
    });
  });
});
