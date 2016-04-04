/**
 * # B-Side
 */

import Vinyl from 'vinyl';
import isBuffer from 'vinyl/lib/isBuffer';
import isStream from 'vinyl/lib/isStream';
import isNull from 'vinyl/lib/isNull';

const INSPECT_LENGTH = 40;

/**
 * @class BSide
 * @extends Vinyl
 */
export default class BSide extends Vinyl {
	/**
	 * @property contents
	 */
	get contents() {
		return this._contents;
	}
	set contents(val) {
		if (
			typeof val !== 'string'
			&& !isBuffer(val)
			&& !isStream(val)
			&& !isNull(val)
		) {
			throw new Error('File.contents can only be a String, a Buffer, a Stream, or null.');
		}

		this._contents = val;
	}

	/**
	 * @method inspect
	 * @return {String}
	 */
	inspect() {
		const formatted = super.inspect();

		if (!this.isString()) {
			return formatted;
		}

		let contents = this.contents;

		if (contents.length > INSPECT_LENGTH) {
			contents = `${contents.slice(0, INSPECT_LENGTH - 3)}...`;
		}

		contents = JSON.stringify(contents);

		return `${formatted.slice(0, -1)} ${contents}>`;
	}

	/**
	 * @method isString
	 * @return {Boolean}
	 */
	isString() {
		return typeof this.contents === 'string';
	}
}