const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */

function transform(arr) {
	if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");
	let res = [];
	let isNextDiscard = false;
	let isNextDouble = false;
	for (let i = 0; i < arr.length; i++) {
		if (isNextDiscard) {
			isNextDiscard = false;
			continue;
		}
		if (isNextDouble) {
			isNextDouble = false;
			res.push(arr[i]);
			res.push(arr[i]);
			continue;
		}
		switch (arr[i]) {
			case '--double-next':
				isNextDouble = true;
				break;
			case '--discard-next':
				isNextDiscard = true;
				break;
			case '--discard-prev':
				if (res[i - 1]) {
					res.splice(i - 1, 2);
				}
				break;
			case '--double-prev':
				if (res[i - 1]) {
					res.push(res[i - 1]);
				}
				break;
			default:
				res.push(arr[i]);
		}
	}
	return res;
}

module.exports = {
	transform,
};
