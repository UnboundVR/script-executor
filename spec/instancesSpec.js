import Instances from '../src/instances';

describe('instances', () => {
  let instances;

  beforeEach(() => {
    instances = new Instances();
  });

  describe('set', () => {
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

    it('should make a deepy copy of data when merging into prototype object', () => {
      let proto = {
        alterValue() {
          this.obj.someNestedValue = 2;
        }
      };

      let data = {
        obj: {
          someNestedValue: 1
        }
      };

      instances.set('some-id', proto, data);
      let instance = instances.get('some-id');

      instances.call('some-id', 'alterValue');

      expect(instance.obj.someNestedValue).toBe(2);
      expect(data.obj.someNestedValue).toBe(1);
    });
  });

  describe('remove', () => {
    it('should remove the instance', () => {
      instances.set('some-id', {});
      expect(instances.get('some-id')).toBeTruthy();
      instances.remove('some-id');
      expect(instances.get('some-id')).toBeFalsy();
    });
  });
});
