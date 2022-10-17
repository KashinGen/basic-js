const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
	calculateDepth(arr, depth = 0) {
		let count = depth;
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				const newCount = this.calculateDepth(arr[i], depth);
				console.log(arr[i], count, newCount);

				count = count < newCount ? newCount : count;
			}
		}
		return count + 1;
	}
}

module.exports = {
	DepthCalculator,
};
