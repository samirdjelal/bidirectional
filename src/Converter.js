// eslint-disable-next-line no-extend-native
String.prototype.toCharArray = function() {
	return this.split('')
}
// eslint-disable-next-line no-extend-native
String.prototype.toCharCode = function() {
	return this.charCodeAt(0)
}
// eslint-disable-next-line no-extend-native
String.prototype.reverse = function() {
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

function isAlefChar(_a) {
	return (_a === '\u0622' || _a === '\u0623' || _a === '\u0625' || _a === '\u0627')
}

function isLamChar(_a) {
	return (_a === LAM_CHAR)
}

function isTransparentChar(_a) {
	return (_a >= '\u064B' && _a <= '\u065E')
}

function inLinkRange(_a) {
	return (_a >= LINK_MAP_RANGE[0] && _a <= LINK_MAP_RANGE[1])
}

function isLinkableBefore(_a) {
	if (!inLinkRange(_a)) {
		return false
	}
	const _b = CHAR_LINK_TYPE[_a.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
	return (_b === BEFORE || _b === DUAL || _b === CAUSING)
}

function isLinkableAfter(_a) {
	if (!inLinkRange(_a)) {
		return false
	}
	const _b = CHAR_LINK_TYPE[_a.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
	return (_b === DUAL || _b === CAUSING)
}

function getCharLinkType(_a) {
	if (!inLinkRange(_a)) {
		return NONE
	}
	const _b = _a.toCharCode() - LINK_MAP_RANGE[0].toCharCode();
	return CHAR_LINK_TYPE[_b]
}

function linkChar(_a, _b) {
	if (!inLinkRange(_a)) {
		return _a
	}
	const _c = _a.toCharCode() - LINK_MAP_RANGE[0].toCharCode();
	switch (CHAR_LINK_TYPE[_c]) {
		case BEFORE:
			return String['fromCharCode'](LINK_MAP[_c].toCharCode() + (_b % 2));
		case DUAL:
			return String['fromCharCode'](LINK_MAP[_c].toCharCode() + _b);
		case NONE:
			return String['fromCharCode'](LINK_MAP[_c].toCharCode());
		case CAUSING:
		default:
			return _a
	}
}

function linkLamAlef(_a, _b) {
	if (!isAlefChar(_a)) {
		return _a
	}
	const _c = _a.toCharCode() - LAMALEF_LINK_MAP_RANGE[0].toCharCode();
	return String['fromCharCode'](LAMALEF_LINK_MAP[_c].toCharCode() + (_b % 2))
}

function internalLinkText(_a) {
	let _b;
	let _c = ISOLATED;
	let _d = 0;
	for (let _e = 0; _e < _a['length']; _e++) {
		const _arg = _a[_e];
		if (getCharLinkType(_arg) === CAUSING) {
			_a[_e - _d] = _arg;
			_c = MEDIAL;
			continue
		}
		let _f = _e + 1;
		while (_f < _a['length'] - 1 && isTransparentChar(_a[_f])) {
			_f++
		}
		_b = (_c === INITIAL || _c === MEDIAL) ? FINAL : ISOLATED;
		if (_f < _a['length']) {
			if (isLamChar(_arg) && isAlefChar(_a[_f])) {
				_a[_e - _d] = linkLamAlef(_a[_f], _b);
				_c = _b;
				_d += _f - _e;
				_e = _f;
				continue
			}
			if (isLinkableAfter(_arg) && isLinkableBefore(_a[_f])) {
				_b |= INITIAL
			}
		}
		_a[_e - _d] = linkChar(_arg, _b);
		_c = _b
	}
	return _d
}

function linkText(_a) {
	if (_a == null || _a['length'] === 0) {
		return _a
	}
	const _b = _a.toCharArray();
	const _c = internalLinkText(_b);
	return _b['slice'](0, _b['length'] - _c)['join']('')
}

export default linkText;
