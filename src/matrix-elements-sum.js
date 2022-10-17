const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
	let sum = 0;
	console.log(matrix.length);
	for (let i = 0; i < matrix.length; i++) {
		console.log(matrix[i].length);
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i - 1]) {
				sum = matrix[i - 1][j] === 0 ? sum : sum + matrix[i][j];
			} else {
				sum += matrix[i][j];
			}
		}
	}
	return sum;
}

module.exports = {
	getMatrixElementsSum,
};
getMatrixElementsSum([
	[0, 1, 1, 2],
	[0, 5, 0, 0],
	[2, 0, 3, 3],
]);
