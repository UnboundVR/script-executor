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

  it('should make a deepy copy of data when merging into prototype object', () => {
    let data = {
      obj: {
        someNestedValue: 1
      }
    };

    prototypes.set('some-id', 'function() {this.obj.someNestedValue = 2;}', {data});
    let proto = prototypes.get('some-id');
    expect(proto.obj.someNestedValue).toBe(2);
    expect(data.obj.someNestedValue).toBe(1);
  });

  it('should allow us to call public methods defined in the user code', () => {
    prototypes.set('some-id', 'function() {this.getStuff = function(){return "some-val";};}');
    let result = prototypes.call('some-id', 'getStuff');

    expect(result).toBe('some-val');
  });

  // it('should have access to global scope when options.global set to true', () => {
  //   window.someValue = 1;
  //   prototypes.set('some-id', 'function() {window.someValue = 2;}', {global: true});
  //
  //   expect(window.someValue).toBe(2);
  // });
  //
  // it('should not have access to global scope when options.global set to false', () => {
  //   window.someValue = 1;
  //   prototypes.set('some-id', 'function() {window.someValue = 2;}', {global: false});
  //
  //   expect(window.someValue).toBe(1);
  // });
});
