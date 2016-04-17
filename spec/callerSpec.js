import Caller from '../src/caller';

describe('caller', () => {
  it('should call a method in a given object with corresponding params', (done) => {
    const someValue = 'someValue';

    let objects = {
      'some-id': {
        someMethod(params) {
          expect(params.val).toBe(someValue);
          done();
        }
      }
    };
    let caller = new Caller(objects);

    caller.call('some-id', 'someMethod', {val: someValue});
  });

  it('should return the result of calling a method', () => {
    const someValue = 'someValue';

    let objects = {
      'some-id': {
        someMethod() {
          return someValue;
        }
      }
    };
    let caller = new Caller(objects);

    let result = caller.call('some-id', 'someMethod');

    expect(result).toBe(someValue);
  });

  it('should throw if object does not exist', () => {
    let objects = {};
    let caller = new Caller(objects);

    expect(() => caller.call('some-id', 'some-method')).toThrow();
  });

  it('should throw if method does not exist', () => {
    let objects = {
      'some-id': {}
    };
    let caller = new Caller(objects);

    expect(() => caller.call('some-id', 'some-method')).toThrow();
  });
});
