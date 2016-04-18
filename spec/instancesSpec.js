import Instances from '../src/instances';

describe('instances', () => {
  let instances;

  beforeEach(() => {
    instances = new Instances();
  });

  it('should store and retrieve instances by ID', () => {
    instances.set('some-id', {});
    let instance = instances.get('some-id');

    expect(instance).toBeDefined();
  });

  it('should make instance inherit from given prototype', () => {
    let proto = {'something': 'asd'};

    instances.set('some-id', proto);
    let instance = instances.get('some-id');

    expect(instance.something).toBe('asd');

    instance.something = 'wasd';

    expect(proto.something).toBe('asd');
  });

  it('should allow calling a method from the prototype', () => {
    const someValue = 'something';

    let prototype = {
      someMethod() {
        return someValue;
      }
    };

    instances.set('some-id', prototype);
    let result = instances.call('some-id', 'someMethod');
    expect(result).toBe(someValue);
  });
});
