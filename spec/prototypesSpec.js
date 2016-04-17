import Prototypes from '../src/prototypes';

describe('prototypes', () => {
  let prototypes;

  beforeEach(() => {
    prototypes = new Prototypes();
  });

  it('should throw and not store anything if code has syntax errors', () => {
    expect(() => prototypes.set('some-id', 'function() {var a = !?!?}')).toThrow();
    expect(prototypes.get('some-id')).not.toBeDefined();
  });

  it('should throw and not store anything if code does not declare a function', () => {
    expect(() => prototypes.set('some-id', 'var a = 3;')).toThrow();
    expect(prototypes.get('some-id')).not.toBeDefined();
  });

  it('should store and retrieve prototypes by ID', () => {
    prototypes.set('some-id', 'function() {}');
    let prototype = prototypes.get('some-id');

    expect(prototype).toBeDefined();
  });

  it('should make world accessible from user generated code', (done) => {
    let world = {
      done
    };

    prototypes.set('some-id', 'function(world) {world.done();}', {world});
  });

  it('should merge data into prototype object', (done) => {
    let data = {
      done
    };

    prototypes.set('some-id', 'function() {this.done()}', {data});
  });

  it('should allow us to call public methods defined in the user code', () => {
    prototypes.set('some-id', 'function() {this.getStuff = function(){return "some-val";};}');
    let result = prototypes.call('some-id', 'getStuff');

    expect(result).toBe('some-val');
  });
});
