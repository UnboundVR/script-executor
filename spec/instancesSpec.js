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

    it('should do nothing if the instance does not exist', () => {
      instances.remove('whatever'); // no exception
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

    it('should pass api and instance-specific metadata', (done) => {
      const SOME_VALUE = 'someValue';

      let api = {
        someMethod(param) {
          expect(param).toBe(SOME_VALUE);
          done();
        }
      };

      let metadata = {
        someValue: SOME_VALUE
      };

      class Stuff {
        constructor(api, metadata) {
          this.api = api;
          this.metadata = metadata;
        }

        test() {
          this.api.someMethod(this.metadata.someValue);
        }
      }

      instances.create('some-id', Stuff, {api, metadata});

      let instance = instances.get('some-id');

      instance.test();
    });

    it('should store metadata as the same object passed to the class but unalterable', () => {
      let metadata = {
        something: 'something'
      };

      class Stuff {
        constructor(api, metadata) {
          this.metadata = metadata;
        }

        modifyStuff() {
          this.metadata.something = 'something-else';
        }
      }

      instances.create('some-id', Stuff, {metadata});
      let instance = instances.get('some-id');
      instance.modifyStuff();

      let instanceMetadata = instances.getMetadata('some-id');

      expect(instanceMetadata.something).toBe('something');
      expect(instance.metadata.something).toBe('something-else');
    });

    it('should make a deep copy of api when merging', (done) => {
      const SOME_VALUE = 'someValue';

      let api = {
        test: done
      };

      class Stuff {
        constructor(api) {
          api.test = function() {
            throw new Error('Hacked you!');
          }
        }
      }

      instances.create('some-id', Stuff, {api});
      api.test();
    });

    it('should make a deep copy of metadata when merging', () => {
      const SOME_VALUE = 'someValue';

      let metadata = {
        someImportantValue: SOME_VALUE
      };

      class Stuff {
        constructor(api, metadata) {
          metadata.someImportantValue = 'notWhatWeExpect';
        }
      }

      instances.create('some-id', Stuff, {metadata});
      expect(metadata.someImportantValue).toBe(SOME_VALUE);
    });
  });
});
