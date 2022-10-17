const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
	chain: [],

	getLength() {
		return this.chain.length;
	},
	addLink(value) {
		this.chain.push('( ' + value + ' )');
		return this;
	},
	removeLink(position) {
		const index = position - 1;
		if (!this.chain[index]) {
			this.chain = [];
			throw new Error("You can't remove incorrect link!");
		} else {
			this.chain.splice(index, 1);
		}
		return this;
	},
	reverseChain() {
		this.chain = [...this.chain.reverse()];
		return this;
	},
	finishChain() {
		const str = this.chain.join('~~');
		this.chain = [];
		return str;
	},
};

module.exports = {
	chainMaker,
};
