import Classes from '../src/classes';
import sinon from 'sinon';
import jasmineSinon from 'jasmine-sinon';

let mockLoader;

const id = 'someId';
const code = 'someCode';
const ctor = function() {};
const obj = {};

function setup(loadSuccess, resultIsFunc) {
  mockLoader = sinon.stub().withArgs(code).returns(loadSuccess ? Promise.resolve(resultIsFunc ? ctor : obj) : Promise.reject('some error'));
  return new Classes(mockLoader);
}

describe('Classes', () => {
  it('should load class using loader', async (done) => {
    let classes = setup(true, true);
    await classes.load(id, code);

    expect(classes.get(id)).toBe(ctor);
    done();
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
