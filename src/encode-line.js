const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */

function encodeLine(str) {
	if (str.length === 0) return '';
	let buff = str[0];
	let count = 1;
	let res = '';
	for (let i = 1; i < str.length; i++) {
		if (str[i] === buff) {
			count++;
		} else {
			res += count > 1 ? count + buff : buff;
			buff = str[i];
			count = 1;
		}
	}
	res += count > 1 ? count + buff : buff;
	return res;
}

module.exports = {
	encodeLine,
};
