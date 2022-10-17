const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */

class VigenereCipheringMachine {
	constructor(isStraight) {
		this.isStraight = typeof isStraight === 'boolean' ? isStraight : true;
		this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		this.square = this.generateSquare();
	}
	generateSquare() {
		const square = [];
		for (let i = 0; i < this.alphabet.length; i++) {
			square.push([...this.alphabet.slice(i), ...this.alphabet.slice(0, i)]);
		}
		return square;
	}
	getKeyText(text, key) {
		let keyText = '';
		let indexKey = 0;
		let nonAlthabetCount = 0;
		for (let i = 0; i < text.length; i++) {
			indexKey = (i - nonAlthabetCount) % key.length === 0 ? 0 : indexKey;
			if (this.alphabet.includes(text[i])) {
				keyText += key[indexKey];
				indexKey++;
			} else {
				keyText += text[i];
				nonAlthabetCount++;
			}
			console.log(keyText);
		}
		return keyText;
	}
	encrypt(text, key) {
		if (typeof text !== 'string' || typeof key !== 'string')
			throw new Error('Incorrect arguments!');

		const upperText = text.toUpperCase();
		const upperKey = key.toUpperCase();
		const keyText = this.getKeyText(upperText, upperKey);
		console.log(keyText);
		let res = [];
		for (let i = 0; i < keyText.length; i++) {
			const ind1 = this.alphabet.indexOf(upperText[i]);
			const ind2 = this.alphabet.indexOf(keyText[i]);
			res.push(ind1 >= 0 ? this.square[ind1][ind2] : keyText[i]);
		}
		return !this.isStraight ? res.reverse().join('') : res.join('');
	}
	decrypt(text, key) {
		if (typeof text !== 'string' || typeof key !== 'string')
			throw new Error('Incorrect arguments!');
		const upperText = text.toUpperCase();
		const upperKey = key.toUpperCase();
		const keyText = this.getKeyText(upperText, upperKey);
		let res = [];
		for (let i = 0; i < keyText.length; i++) {
			const ind1 = this.alphabet.indexOf(keyText[i]);
			if (ind1 >= 0) {
				const ind2 = this.square[ind1].indexOf(upperText[i]);
				res.push(this.alphabet[ind2]);
			} else {
				res.push(keyText[i]);
			}
		}
		return !this.isStraight ? res.reverse().join('') : res.join('');
	}
}
const directMachine = new VigenereCipheringMachine();
const reverseMachine = new VigenereCipheringMachine(false);

// reverseMachine.encrypt('attack at dawn!', 'alphonse')
// reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse')
console.log(reverseMachine.encrypt('attack at dawn!', 'alphonse'));
console.log(reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse'));

module.exports = {
	VigenereCipheringMachine,
};
