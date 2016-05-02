import Instances from '../src/instances';

let instances;

beforeEach(() => {
  instances = new Instances();
});

describe('instances', () => {
  describe('remove', () => {
    it('should remove instance', () => {
      class Stuff {}
      class Stuff2 {}

      instances.create('some-id', Stuff);
      instances.create('some-other-id', Stuff2);

      expect(instances.get('some-id')).toBeTruthy();
      expect(instances.get('some-other-id')).toBeTruthy();

      instances.remove('some-id');

      expect(instances.get('some-id')).toBeFalsy();
      expect(instances.get('some-other-id')).toBeTruthy();
    });
  });

  describe('getAllIds', () => {
    it('should return all IDs', () => {
      class Stuff {}
      class Stuff2 {}

      instances.create('some-id', Stuff);
      instances.create('some-other-id', Stuff2);

      let allIDs = instances.getAllIDs();

      expect(allIDs.indexOf('some-id') != -1).toBeTruthy();
      expect(allIDs.indexOf('some-other-id') != -1).toBeTruthy();
      expect(allIDs.length).toBe(2);
    });
  });

  describe('create', () => {
    it('should create an instance of the class given and store it by id', () => {
      const SOME_VALUE = 'someValue';

      class Stuff {
        constructor() {
          this.someProp = SOME_VALUE;
        }
      }

      instances.create('some-id', Stuff);

      let instance = instances.get('some-id');

      expect(instance.someProp).toBe(SOME_VALUE);
    });

    it('should merge world and instance-specific data', (done) => {
      const SOME_VALUE = 'someValue';

      let world = {
        someMethod(param) {
          expect(param).toBe(SOME_VALUE);
          done();
        }
      };

      let data = {
        someValue: SOME_VALUE
      };

      class Stuff {
        constructor(world, data) {
          this.world = world;
          this.data = data;
        }

        test() {
          this.world.someMethod(this.data.someValue);
        }
      }

      instances.create('some-id', Stuff, {world, data});

      let instance = instances.get('some-id');

      instance.test();
    });

    it('should make a deep copy of world when merging', (done) => {
      const SOME_VALUE = 'someValue';

      let world = {
        test: done
      };

      class Stuff {
        constructor(world) {
          world.test = function() {
            throw new Error('Hacked you!');
          }
        }
      }

      instances.create('some-id', Stuff, {world});
      world.test();
    });

    it('should make a deep copy of data when merging', () => {
      const SOME_VALUE = 'someValue';

      let data = {
        someImportantValue: SOME_VALUE
      };

      class Stuff {
        constructor(world, data) {
          data.someImportantValue = 'notWhatWeExpect';
        }
      }

      instances.create('some-id', Stuff, {data});
      expect(data.someImportantValue).toBe(SOME_VALUE);
    });
  });
});
