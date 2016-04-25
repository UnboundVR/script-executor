import Events from '../src/events';
import Objects from '../src/objects';
import sinon from 'sinon';
import jasmineSinon from 'jasmine-sinon';
const EventEmitter = require('events');

class ObjectsStub extends Objects {
  constructor(objs) {
    super();

    for(let key in objs) {
      this.objects[key] = objs[key];
    }
  }
}

let deletedObject = {
  onSomething: sinon.stub()
};

let objs;
let emitter;
let objects;
let monitoredEvents;
let events;

beforeEach(() => {
  objs = {
    'some-id': {
      onSomething: sinon.stub(),
      shouldCall: true
    },
    'some-other-id': {
      onSomething: sinon.stub(),
      onNotMonitored: sinon.stub()
    },
    'yet-another-id': {},
    'deleted-id': deletedObject,
  };

  monitoredEvents = ['Something'];
  emitter = new EventEmitter();
  objects = new ObjectsStub(objs);
  events = new Events(objects);
  events.wire(emitter, monitoredEvents);

  objects.remove('deleted-id');
});

describe('events', () => {
  it('should call method in all objects if no filter passed', () => {
    let payload = 'asdasd';

    emitter.emit('Something', payload);
    expect(objs['some-id'].onSomething).toHaveBeenCalledWith(payload);
    expect(objs['some-other-id'].onSomething).toHaveBeenCalledWith(payload);
  });

  it('should call method only in matching object if ID filter passed', () => {
    emitter.emit('Something', {}, (obj, id) => id == 'some-id');
    expect(objs['some-id'].onSomething).toHaveBeenCalled();
    expect(objs['some-other-id'].onSomething).not.toHaveBeenCalled();
  });

  it('should call method only in matching object if obj filter passed', () => {
    emitter.emit('Something', {}, (obj, id) => obj.shouldCall);
    expect(objs['some-id'].onSomething).toHaveBeenCalled();
    expect(objs['some-other-id'].onSomething).not.toHaveBeenCalled();
  });

  it('should ignore non-monitored events', () => {
    emitter.emit('NotMonitored');
    expect(objs['some-other-id'].onNotMonitored).not.toHaveBeenCalled();
  });

  it('should ignore handlers from deleted objects', () => {
    emitter.emit('Something');
    expect(deletedObject.onSomething).not.toHaveBeenCalled();
  });
});
