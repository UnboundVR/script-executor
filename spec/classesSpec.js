import Classes from '../src/classes';
import sinon from 'sinon';

let mockLoader;

const id = 'someId';
const otherId = 'someOtherId';
const code = 'someCode';
const otherCode = 'someOtherCode';
const ctor = function() {};
const obj = {};
const promises = [];

function setup(loadSuccess, resultIsFunc) {
  mockLoader = sinon.stub().withArgs(code).returns(loadSuccess ? Promise.resolve(resultIsFunc ? ctor : obj) : Promise.reject('some error'));
  return new Classes(mockLoader);
}

function setupSequential() {
  mockLoader = (code) => new Promise((resolve, reject) => {
    promises.push({resolve, reject});
  });
  return new Classes(mockLoader);
}

describe('Classes', () => {
  it('should load class using loader', async (done) => {
    let classes = setup(true, true);
    await classes.load(id, code);

    expect(classes.get(id)).toBe(ctor);
    done();
  });

  it('should load sequentially', async (done) => {
    let classes = setupSequential(true, true);

    let firstPromise = classes.load(id, code);
    let secondPromise = classes.load(otherId, otherCode);

    expect(promises.length).toBe(1);

    firstPromise.then(() => {
      expect(promises.length).toBe(2);
      done();
    });

    promises[0].resolve(ctor);
  });

  it('should throw and not register when loader returns not a function', async (done) => {
    let classes = setup(true, false);
    try {
      await classes.load(id, code);
    } catch(e) {
      expect(classes.get(id)).toBeFalsy();
      done();
    }
  });

  it('should throw and not register when loader fails', async (done) => {
    let classes = setup(false);
    try {
      await classes.load(id, code);
    } catch(e) {
      expect(classes.get(id)).toBeFalsy();
      done();
    }
  });
});
