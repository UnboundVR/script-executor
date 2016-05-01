import Block from '../src/block';

describe('block', () => {
  it('should store world param', () => {
    let world = 'something';
    let block = new Block(world);

    expect(block.world).toBe(world);
  });

  it('should merge data param', () => {
    const SOME_VALUE = 'something';

    let data = {
      someValue: SOME_VALUE
    };

    let block = new Block({}, data);

    expect(block.someValue).toBe(SOME_VALUE);
  });
});
