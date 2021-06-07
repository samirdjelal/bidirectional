String.prototype.toCharArray = function () {
	return this.split('')
}
String.prototype.toCharCode = function () {
	return this.charCodeAt(0)
}
String.prototype.reverse = function () {
	return this.toCharArray().reverse().join('')
}

const ISOLATED = 0;
const FINAL = 1;
const INITIAL = 2;
const MEDIAL = 3;
const NONE = 0;
const BEFORE = 1;
const DUAL = 2;
const CAUSING = 3;
const LAM_CHAR = '\u0644';
const LINK_MAP_RANGE = ['\u0621', '\u064A'];
const LINK_MAP = ['\uFE80', '\uFE81', '\uFE83', '\uFE85', '\uFE87', '\uFE89', '\uFE8D', '\uFE8F', '\uFE93', '\uFE95', '\uFE99', '\uFE9D', '\uFEA1', '\uFEA5', '\uFEA9', '\uFEAB', '\uFEAD', '\uFEAF', '\uFEB1', '\uFEB5', '\uFEB9', '\uFEBD', '\uFEC1', '\uFEC5', '\uFEC9', '\uFECD', '\u063B', '\u063C', '\u063D', '\u063E', '\u063F', '\u0640', '\uFED1', '\uFED5', '\uFED9', '\uFEDD', '\uFEE1', '\uFEE5', '\uFEE9', '\uFEED', '\uFEEF', '\uFEF1'];
const LAMALEF_LINK_MAP_RANGE = ['\u0622', '\u0627'];
const LAMALEF_LINK_MAP = ['\uFEF5', '\uFEF7', '\u0624', '\uFEF9', '\u0626', '\uFEFB'];
const CHAR_LINK_TYPE = [NONE, BEFORE, BEFORE, BEFORE, BEFORE, DUAL, BEFORE, DUAL, BEFORE, DUAL, DUAL, DUAL, DUAL, DUAL, BEFORE, BEFORE, BEFORE, BEFORE, DUAL, DUAL, DUAL, DUAL, DUAL, DUAL, DUAL, DUAL, NONE, NONE, NONE, NONE, NONE, CAUSING, DUAL, DUAL, DUAL, DUAL, DUAL, DUAL, DUAL, BEFORE, DUAL, DUAL];

function isAlefChar(char) {
	return ['\u0622', '\u0623', '\u0625', '\u0627'].includes(char);
}

function isLamChar(char) {
	return (char === LAM_CHAR)
}

function isTransparentChar(char) {
	return (char >= '\u064B' && char <= '\u065E')
}

function inLinkRange(char) {
	return (char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])
}

function isLinkableBefore(char) {
	if (!inLinkRange(char)) {
		return false
	}
	const link_type = CHAR_LINK_TYPE[char.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
	return [BEFORE, DUAL, CAUSING].includes(link_type);
}

function isLinkableAfter(char) {
	if (!inLinkRange(char)) {
		return false
	}
	const link_type = CHAR_LINK_TYPE[char.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
	return [DUAL, CAUSING].includes(link_type);
	
}

function getCharLinkType(char) {
	if (!inLinkRange(char)) {
		return NONE
	}
	return CHAR_LINK_TYPE[char.toCharCode() - LINK_MAP_RANGE[0].toCharCode()]
}

function linkChar(char, b) {
	if (!inLinkRange(char)) {
		return char
	}
	const link = char.toCharCode() - LINK_MAP_RANGE[0].toCharCode();
	switch (CHAR_LINK_TYPE[link]) {
		case BEFORE:
			return String['fromCharCode'](LINK_MAP[link].toCharCode() + (b % 2));
		case DUAL:
			return String['fromCharCode'](LINK_MAP[link].toCharCode() + b);
		case NONE:
			return String['fromCharCode'](LINK_MAP[link].toCharCode());
		case CAUSING:
		default:
			return char
	}
}

function linkLamAlef(char, b) {
	if (!isAlefChar(char)) {
		return char
	}
	return String['fromCharCode'](LAMALEF_LINK_MAP[char.toCharCode() - LAMALEF_LINK_MAP_RANGE[0].toCharCode()].toCharCode() + (b % 2))
}

function internalLinkText(text) {
	let finalCharPosition;
	let position = ISOLATED;
	let previous = 0;
	for (let i = 0; i < text['length']; i++) {
		const char = text[i];
		if (getCharLinkType(char) === CAUSING) {
			text[i - previous] = char;
			position = MEDIAL;
			continue
		}
		let nextChar = i + 1;
		while (nextChar < text['length'] - 1 && isTransparentChar(text[nextChar])) {
			nextChar++
		}
		finalCharPosition = (position === INITIAL || position === MEDIAL) ? FINAL : ISOLATED;
		if (nextChar < text['length']) {
			if (isLamChar(char) && isAlefChar(text[nextChar])) {
				text[i - previous] = linkLamAlef(text[nextChar], finalCharPosition);
				position = finalCharPosition;
				previous += nextChar - i;
				i = nextChar;
				continue
			}
			if (isLinkableAfter(char) && isLinkableBefore(text[nextChar])) {
				finalCharPosition |= INITIAL
			}
		}
		text[i - previous] = linkChar(char, finalCharPosition);
		position = finalCharPosition
	}
	return previous
}

function linkText(text) {
	if (text == null || text['length'] === 0) {
		return text
	}
	const charArray = text.toCharArray();
	return charArray['slice'](0, charArray['length'] - internalLinkText(charArray))['join']('')
}

export default linkText;
