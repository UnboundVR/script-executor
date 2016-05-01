import extend from 'extend';

export default class Block {
	constructor(world, data) {
		this.world = world;
		extend(this, data);
	}
}
