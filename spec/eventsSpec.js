import Events from '../src/events';
import Objects from '../src/objects';
import sinon from 'sinon';
import jasmineSinon from 'jasmine-sinon';
const EventEmitter = require('events');

let isFunction = function(obj) {
  return typeof obj == 'function' || false;
};

class ObjectsStub extends Objects {
  constructor(objs) {
    super();

    for(let key in objs) {
      this.objects[key] = objs[key];
    }
  }
}

let objs;
let emitter;
let objects;
let monitoredEvents;
let events;

beforeEach(() => {
  objs = {
    'some-id': {
      onSomething: sinon.stub()
    },
    'some-other-id': {
      onSomething: sinon.stub(),
      onNotMonitored: sinon.stub()
    },
    'yet-another-id': {}
  };

  monitoredEvents = ['Something'];
  emitter = new EventEmitter();
  objects = new ObjectsStub(objs);
  events = new Events(emitter, monitoredEvents, objects);
  events.wire();
});

describe('events', () => {
  it('should call method in all objects if no filter passed', () => {
    let payload = 'asdasd';

    emitter.emit('Something', payload);
    expect(objs['some-id'].onSomething).toHaveBeenCalledWith(payload);
    expect(objs['some-other-id'].onSomething).toHaveBeenCalledWith(payload);
  });

  it('should call method only in matching object if id filter passed', () => {
    emitter.emit('Something', {}, {id: 'some-id'});
    expect(objs['some-id'].onSomething).toHaveBeenCalled();
    expect(objs['some-other-id'].onSomething).not.toHaveBeenCalled();
  });

  it('should ignore non-monitored events', () => {
    let payload = 'asdasd';

    emitter.emit('NotMonitored');
    expect(objs['some-other-id'].onNotMonitored).not.toHaveBeenCalled();
  });
});
