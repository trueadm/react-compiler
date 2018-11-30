/* eslint-disable */

module.exports = (function() {
  var cx = function cx(classNames) {
    if (typeof classNames == 'object') {
      return Object.keys(classNames)
        .map(function(className) {
          return classNames[className] ? className : '';
        })
        .map(csx)
        .join(' ');
    } else {
      return Array.prototype.map.call(arguments, csx).join(' ');
    }
  };
  var csx = function csx(selector) {
    return selector && selector.replace(/([^\\])\//g, '$1__');
  };

  var _typeof =
    typeof Symbol === 'function' &&
    typeof (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') ===
      'symbol'
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !==
              (typeof Symbol === 'function' ? Symbol.prototype : '@@prototype')
            ? 'symbol'
            : typeof obj;
        };

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    }
    return call && (typeof call === 'object' || typeof call === 'function')
      ? call
      : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' +
          typeof superClass,
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });

    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var IntlVariations = {
    BITMASK_NUMBER: 805306368,
    NUMBER_ZERO: 1073741824,
    NUMBER_ONE: 268435456,
    NUMBER_TWO: 536870912,
    NUMBER_FEW: 1342177280,
    NUMBER_MANY: 805306368,
    NUMBER_OTHER: 1610612736,
    BITMASK_GENDER: 50331648,
    GENDER_MALE: 16777216,
    GENDER_FEMALE: 33554432,
    GENDER_UNKNOWN: 50331648,
  };

  var IntlCLDRNumberType04 = {
    getNumberVariationType: function getNumberVariationType(n) {
      if (n >= 0 && n <= 1) {
        return IntlVariations.NUMBER_ONE;
      } else {
        return IntlVariations.NUMBER_OTHER;
      }
    },
  };

  function FbtNumberType() {}

  FbtNumberType.getNumberVariationType = function(n) {
    return IntlCLDRNumberType04.getNumberVariationType(n);
  };

  var _overrides = {
      overrides: {
        '1_8b0c31a270a324f26d2417a358106611': 'override',
        '1_fakeHash1': 'This is an override with a {param}',
        '1_fakeHash2': 'These are overrides and a {param}',
        '1_fakeHash3': 'Override a {param}',
      },
    },
    overrides = _overrides.overrides;

  var NumberFormatConfig = {
    decimalSeparator: '.',
    minDigitsForThousandsSeparator: 4,
    numberDelimiter: ',',
    standardDecimalPatternInfo: {
      primaryGroupSize: 3,
      secondaryGroupSize: 3,
    },

    numberingSystemData: null,
  };
  function escapeRegex(str) {
    return str.replace(/([.?*+\^$\[\]\\(){}|\-])/g, '\\$1');
  }

  var EXPONENT_PATTERN = /(\d)(\d\d\d)($|\D)/;
  var DEFAULT_GROUPING_SIZE = 3;

  var CURRENCIES_WITH_DOTS = [
    '\u0433\u0440\u043D.',
    '\u0434\u0435\u043D.',
    '\u043B\u0432.',
    '\u043C\u0430\u043D.',
    '\u0564\u0580.',
    '\u062C.\u0645.',
    '\u062F.\u0625.',
    '\u062F.\u0627.',
    '\u062F.\u0628.',
    '\u062F.\u062A.',
    '\u062F.\u062C.',
    '\u062F.\u0639.',
    '\u062F.\u0643.',
    '\u062F.\u0644.',
    '\u062F.\u0645.',
    '\u0631.\u0633.',
    '\u0631.\u0639.',
    '\u0631.\u0642.',
    '\u0631.\u064A.',
    '\u0644.\u0633.',
    '\u0644.\u0644.',
    '\u0783.',
    'B/.',
    'Bs.',
    'Fr.',
    'kr.',
    'L.',
    'p.',
    'S/.',
  ];

  var _regexCache = {};
  function _buildRegex(pattern) {
    if (!_regexCache[pattern]) {
      _regexCache[pattern] = new RegExp(pattern, 'i');
    }
    return _regexCache[pattern];
  }

  var matchCurrenciesWithDots = _buildRegex(
    CURRENCIES_WITH_DOTS.reduce(function(regex, representation, index) {
      return (
        regex + (index ? '|' : '') + '(' + escapeRegex(representation) + ')'
      );
    }, ''),
  );

  function formatNumberRaw(
    value,
    decimals,
    thousandDelimiter,
    decimalDelimiter,
    minDigitsForThousandDelimiter,
    standardPatternInfo,
    numberingSystemData,
  ) {
    thousandDelimiter = thousandDelimiter || '';
    decimalDelimiter = decimalDelimiter || '.';
    minDigitsForThousandDelimiter = minDigitsForThousandDelimiter || 0;
    standardPatternInfo = standardPatternInfo || {
      primaryGroupSize: DEFAULT_GROUPING_SIZE,
      secondaryGroupSize: DEFAULT_GROUPING_SIZE,
    };

    var primaryGroupingSize =
      standardPatternInfo.primaryGroupSize || DEFAULT_GROUPING_SIZE;
    var secondaryGroupingSize =
      standardPatternInfo.secondaryGroupSize || primaryGroupingSize;

    var digits = numberingSystemData && numberingSystemData.digits;
    if (decimals === undefined || decimals === null) {
      value = value.toString();
    } else if (typeof value === 'string') {
      value = truncateLongNumber(value, decimals);
    } else {
      value = _roundNumber(value, decimals);
    }

    var valueParts = value.toString().split('.');
    var wholeNumber = valueParts[0];
    var decimal = valueParts[1];

    if (
      Math.abs(parseInt(wholeNumber, 10)).toString().length >=
      minDigitsForThousandDelimiter
    ) {
      var replaced = '';
      var replaceWith = '$1' + thousandDelimiter + '$2$3';
      var primaryPattern =
        '(\\d)(\\d{' + (primaryGroupingSize - 0) + '})($|\\D)';
      replaced = wholeNumber.replace(_buildRegex(primaryPattern), replaceWith);

      if (replaced != wholeNumber) {
        wholeNumber = replaced;
        var secondaryPatternString =
          '(\\d)(\\d{' +
          (secondaryGroupingSize - 0) +
          '})(' +
          escapeRegex(thousandDelimiter) +
          ')';
        var secondaryPattern = _buildRegex(secondaryPatternString);
        while (
          (replaced = wholeNumber.replace(secondaryPattern, replaceWith)) !=
          wholeNumber
        ) {
          wholeNumber = replaced;
        }
      }
    }
    if (digits) {
      wholeNumber = _replaceWithNativeDigits(wholeNumber, digits);
      decimal = decimal && _replaceWithNativeDigits(decimal, digits);
    }

    var result = wholeNumber;
    if (decimal) {
      result += decimalDelimiter + decimal;
    }

    return result;
  }

  function _replaceWithNativeDigits(number, digits) {
    var result = '';
    for (var ii = 0; ii < number.length; ++ii) {
      var d = digits[number.charCodeAt(ii) - 48];
      result += d !== undefined ? d : number[ii];
    }
    return result;
  }

  function formatNumber(value, decimals) {
    return formatNumberRaw(
      value,
      decimals,
      '',
      NumberFormatConfig.decimalSeparator,
      NumberFormatConfig.minDigitsForThousandsSeparator,
      NumberFormatConfig.standardDecimalPatternInfo,
      NumberFormatConfig.numberingSystemData,
    );
  }

  function formatNumberWithThousandDelimiters(value, decimals) {
    return formatNumberRaw(
      value,
      decimals,
      NumberFormatConfig.numberDelimiter,
      NumberFormatConfig.decimalSeparator,
      NumberFormatConfig.minDigitsForThousandsSeparator,
      NumberFormatConfig.standardDecimalPatternInfo,
      NumberFormatConfig.numberingSystemData,
    );
  }

  function formatNumberWithLimitedSigFig(value, decimals, numSigFigs) {
    var power = Math.floor(Math.log(value) / Math.LN10);
    var inflatedValue = value;
    if (power < numSigFigs) {
      inflatedValue = value * Math.pow(10, -power + numSigFigs);
    }

    var roundTo = Math.pow(
      10,
      Math.floor(Math.log(inflatedValue) / Math.LN10) - numSigFigs + 1,
    );

    var truncatedValue = Math.round(inflatedValue / roundTo) * roundTo;

    if (power < numSigFigs) {
      truncatedValue /= Math.pow(10, -power + numSigFigs);
    }

    return formatNumberWithThousandDelimiters(truncatedValue, decimals);
  }

  function _roundNumber(valueParam, decimalsParam) {
    var decimals = decimalsParam == null ? 0 : decimalsParam;
    var pow = Math.pow(10, decimals);
    var value = valueParam;
    value = Math.round(value * pow) / pow;
    value = value + '';
    if (!decimals) {
      return value;
    }

    if (value.indexOf('e-') !== -1) {
      return value;
    }

    var pos = value.indexOf('.');
    var zeros = 0;
    if (pos == -1) {
      value += '.';
      zeros = decimals;
    } else {
      zeros = decimals - (value.length - pos - 1);
    }
    for (var i = 0, l = zeros; i < l; i++) {
      value += '0';
    }
    return value;
  }

  var addZeros = function addZeros(x, count) {
    for (var i = 0; i < count; i++) {
      x += '0';
    }
    return x;
  };

  function truncateLongNumber(number, decimals) {
    var pos = number.indexOf('.');
    var dividend = pos === -1 ? number : number.slice(0, pos);
    var remainder = pos === -1 ? '' : number.slice(pos + 1);

    return decimals
      ? dividend +
          '.' +
          addZeros(remainder.slice(0, decimals), decimals - remainder.length)
      : dividend;
  }

  var _decimalSeparatorRegexCache = {};
  var decimalSeparatorRegex = function decimalSeparatorRegex(separator) {
    if (!_decimalSeparatorRegexCache[separator]) {
      _decimalSeparatorRegexCache[separator] = new RegExp(
        '([^\\/p]|^)' + escapeRegex(separator) + '(\\d*).*',
        'i',
      );
    }
    return _decimalSeparatorRegexCache[separator];
  };

  function parseNumberRaw(text, decimalDelimiter, numberDelimiter) {
    var digitsMap = _getNativeDigitsMap();
    if (digitsMap) {
      text = text
        .split('')
        .map(function(character) {
          return digitsMap[character] || character;
        })
        .join('')
        .trim();
    }

    text = text.replace(/^[^\d]*\-/, '\x02');
    text = text.replace(matchCurrenciesWithDots, '');

    numberDelimiter = numberDelimiter || '';

    var decimalExp = escapeRegex(decimalDelimiter);
    var numberExp = escapeRegex(numberDelimiter);

    var isThereADecimalSeparatorInBetween = _buildRegex(
      '^[^\\d]*\\d.*' + decimalExp + '.*\\d[^\\d]*$',
    );

    if (!isThereADecimalSeparatorInBetween.test(text)) {
      var isValidWithDecimalBeforeHand = _buildRegex(
        '(^[^\\d]*)' + decimalExp + '(\\d*[^\\d]*$)',
      );

      if (isValidWithDecimalBeforeHand.test(text)) {
        text = text.replace(isValidWithDecimalBeforeHand, '$1\x01$2');
        return _parseCodifiedNumber(text);
      }
      var isValidWithoutDecimal = _buildRegex(
        '^[^\\d]*[\\d ' + escapeRegex(numberExp) + ']*[^\\d]*$',
      );

      if (!isValidWithoutDecimal.test(text)) {
        text = '';
      }
      return _parseCodifiedNumber(text);
    }
    var isValid = _buildRegex(
      '(^[^\\d]*[\\d ' + numberExp + ']*)' + decimalExp + '(\\d*[^\\d]*$)',
    );

    text = isValid.test(text) ? text.replace(isValid, '$1\x01$2') : '';
    return _parseCodifiedNumber(text);
  }

  function _parseCodifiedNumber(text) {
    text = text
      .replace(/[^0-9\u0001\u0002]/g, '')
      .replace('\x01', '.')
      .replace('\x02', '-');
    var value = Number(text);
    return text === '' || isNaN(value) ? null : value;
  }

  function _getNativeDigitsMap() {
    var nativeDigitMap = {};
    var digits =
      NumberFormatConfig.numberingSystemData &&
      NumberFormatConfig.numberingSystemData.digits;
    if (!digits) {
      return null;
    }
    for (var i = 0; i < digits.length; i++) {
      nativeDigitMap[digits.charAt(i)] = i.toString();
    }

    return nativeDigitMap;
  }

  function parseNumber(text) {
    return parseNumberRaw(
      text,
      NumberFormatConfig.decimalSeparator || '.',
      NumberFormatConfig.numberDelimiter,
    );
  }

  var intlNumUtils = {
    formatNumber: formatNumber,
    formatNumberRaw: formatNumberRaw,
    formatNumberWithThousandDelimiters: formatNumberWithThousandDelimiters,
    formatNumberWithLimitedSigFig: formatNumberWithLimitedSigFig,
    parseNumber: parseNumber,
    parseNumberRaw: parseNumberRaw,
    truncateLongNumber: truncateLongNumber,

    getFloatString: function getFloatString(
      num,
      thousandDelimiter,
      decimalDelimiter,
    ) {
      var str = String(num);
      var pieces = str.split('.');

      var intPart = intlNumUtils.getIntegerString(pieces[0], thousandDelimiter);

      if (pieces.length === 1) {
        return intPart;
      }

      return intPart + decimalDelimiter + pieces[1];
    },

    getIntegerString: function getIntegerString(num, thousandDelimiter) {
      if (thousandDelimiter === '') {
        if (false) {
          throw new Error('thousandDelimiter cannot be empty string!');
        }
        thousandDelimiter = ',';
      }

      var str = String(num);
      var regex = /(\d+)(\d{3})/;
      while (regex.test(str)) {
        str = str.replace(regex, '$1' + thousandDelimiter + '$2');
      }
      return str;
    },
  };

  var FbtResultBase = (function() {
    function FbtResultBase(contents) {
      _classCallCheck(this, FbtResultBase);

      this._contents = contents;
      this._stringValue = null;
    }

    FbtResultBase.prototype.flattenToArray = function flattenToArray() {
      return FbtResultBase.flattenToArray(this._contents);
    };

    FbtResultBase.prototype.getContents = function getContents() {
      return this._contents;
    };

    FbtResultBase.prototype.toString = function toString() {
      if (this._stringValue !== null) {
        return this._stringValue;
      }
      var stringValue = '';
      var contents = this.flattenToArray();
      for (var ii = 0; ii < contents.length; ++ii) {
        var content = contents[ii];
        if (typeof content === 'string' || content instanceof FbtResultBase) {
          stringValue += content;
        } else {
          var details = 'Context not logged.';
          try {
            details = JSON.stringify(content).substr(0, 250);
          } catch (err) {
            details = err.message;
          }
        }
      }
      if (!Object.isFrozen(this)) {
        this._stringValue = stringValue;
      }
      return stringValue;
    };

    FbtResultBase.prototype.toJSON = function toJSON() {
      return this.toString();
    };

    FbtResultBase.flattenToArray = function flattenToArray(contents) {
      var result = [];
      for (var ii = 0; ii < contents.length; ++ii) {
        var content = contents[ii];
        if (Array.isArray(content)) {
          result.push.apply(result, FbtResultBase.flattenToArray(content));
        } else if (content instanceof FbtResultBase) {
          result.push.apply(result, content.flattenToArray());
        } else {
          result.push(content);
        }
      }
      return result;
    };

    return FbtResultBase;
  })();

  [
    'replace',
    'split',
    'toLowerCase',
    'toUpperCase',
    'indexOf',
    'charAt',
    'charCodeAt',
    'substr',
    'substring',
    'trim',
    'lastIndexOf',
    'search',
    'match',
    'slice',
    'codePointAt',
    'endsWith',
    'includes',
    'localeCompare',
    'normalize',
    'repeat',
    'startsWith',
    'toLocaleLowerCase',
    'toLocaleUpperCase',
    'trimLeft',
    'trimRight',
    'link',
    'anchor',
    'fontcolor',
    'fontsize',
    'big',
    'blink',
    'bold',
    'fixed',
    'italics',
    'small',
    'strike',
    'sub',
    'sup',
    'contains',
  ].forEach(function(methodName) {
    FbtResultBase.prototype[methodName] = function() {
      'use strict';

      return this.toString()[methodName].apply(this, arguments);
    };
  });
  var REACT_ELEMENT_TYPE =
    (typeof Symbol === 'function' &&
      (typeof Symbol === 'function' ? Symbol.for : '@@for') &&
      (typeof Symbol === 'function' ? Symbol.for : '@@for')('react.element')) ||
    0xeac7;

  var canDefineProperty = false;
  if (false) {
    try {
      Object.defineProperty({}, 'x', {});
      canDefineProperty = true;
    } catch (x) {}
  }

  var FbtReactUtil = {
    REACT_ELEMENT_TYPE: REACT_ELEMENT_TYPE,

    defineProperty: function defineProperty(target, storeKey, value) {
      if (canDefineProperty) {
        Object.defineProperty(target, storeKey, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: value,
        });
      } else {
        target[storeKey] = value;
      }
    },
  };

  var FbtResult = (function(_FbtResultBase) {
    _inherits(FbtResult, _FbtResultBase);

    function FbtResult(contents) {
      _classCallCheck(this, FbtResult);

      var _this = _possibleConstructorReturn(
        this,
        _FbtResultBase.call(this, contents),
      );

      _this.props = {
        content: contents,
      };

      _this.key = null;
      _this.ref = null;
      return _this;
    }

    return FbtResult;
  })(FbtResultBase);

  var FbtComponent = function FbtComponent(props) {
    return props.content;
  };
  FbtResult.prototype.type = FbtComponent;
  FbtResult.prototype.$$typeof = FbtReactUtil.REACT_ELEMENT_TYPE;

  var FbtResultGK = {
    shouldReturnFbtResult: false,
  };

  var GenderConst = {
    NOT_A_PERSON: 0,
    FEMALE_SINGULAR: 1,
    MALE_SINGULAR: 2,
    FEMALE_SINGULAR_GUESS: 3,
    MALE_SINGULAR_GUESS: 4,
    MIXED_SINGULAR: 5,
    MIXED_PLURAL: 5,
    NEUTER_SINGULAR: 6,
    UNKNOWN_SINGULAR: 7,
    FEMALE_PLURAL: 8,
    MALE_PLURAL: 9,
    NEUTER_PLURAL: 10,
    UNKNOWN_PLURAL: 11,
    UNKNOWN: 0,
  };

  function em(content, inlineMode, translation, hash) {
    var className = cx('intlInlineMode/normal');
    if (hash) {
      if (inlineMode === 'TRANSLATION') {
        className = cx('intlInlineMode/translatable');
      } else if (inlineMode === 'APPROVE') {
        className = cx('intlInlineMode/approvable');
      } else if (inlineMode === 'REPORT') {
        className = cx('intlInlineMode/reportable');
      }
    }

    return {
      $$typeof: FbtReactUtil.REACT_ELEMENT_TYPE,
      type: 'em',
      key: null,
      ref: null,
      props: {
        className: className,
        'data-intl-hash': hash,
        'data-intl-translation': translation,
        'data-intl-trid': '',
        children: content,

        suppressHydrationWarning: true,
      },

      _owner: null,
    };
  }

  var InlineFbtComponent = function InlineFbtComponent(props) {
    return em(props.content, props.inlineMode, props.translation, props.hash);
  };

  var InlineFbtResult = (function(_FbtResultBase2) {
    _inherits(InlineFbtResult, _FbtResultBase2);

    function InlineFbtResult(contents, inlineMode, translation, hash) {
      _classCallCheck(this, InlineFbtResult);

      var _this2 = _possibleConstructorReturn(
        this,
        _FbtResultBase2.call(this, contents),
      );

      _this2.props = {
        content: contents,
        inlineMode: inlineMode,
        translation: translation,
        hash: hash,
      };

      _this2.key = null;
      _this2.ref = null;

      if (false) {
        FbtReactUtil.defineProperty(_this2, '_store', {
          validated: true,
        });
      }
      return _this2;
    }

    return InlineFbtResult;
  })(FbtResultBase);

  InlineFbtResult.prototype.type = InlineFbtComponent;
  InlineFbtResult.prototype.$$typeof = FbtReactUtil.REACT_ELEMENT_TYPE;

  var IntlHoldoutGK = {
    inIntlHoldout: false,
  };

  var IntlViewerContext = {
    GENDER: 805306368,
  };

  var IntlPhonologicalRules = {};

  function memoize(f) {
    var f1 = f;
    var result = void 0;
    return function() {
      !arguments.length ||
        invariant(0, 'A memoized function cannot be called with arguments');

      if (f1) {
        result = f1();
        f1 = null;
      }
      return result;
    };
  }

  function ex(format) {
    for (
      var _len = arguments.length,
        rawArgs = Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      rawArgs[_key - 1] = arguments[_key];
    }
    var args = rawArgs.map(function(arg) {
      return String(arg);
    });
    var expectedLength = format.split('%s').length - 1;
    if (expectedLength !== args.length) {
      return ex(
        'ex args number mismatch: %s',
        JSON.stringify([format].concat(args)),
      );
    }

    if (false) {
      return eprintf.call.apply(eprintf, [null, format].concat(args));
    } else {
      return ex._prefix + JSON.stringify([format].concat(args)) + ex._suffix;
    }
  }

  var printingFunction = ex;

  function invariant(condition, format) {
    if (!condition) {
      var error = void 0;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.',
        );
      } else {
        for (
          var _len = arguments.length,
            params = Array(_len > 2 ? _len - 2 : 0),
            _key = 2;
          _key < _len;
          _key++
        ) {
          params[_key - 2] = arguments[_key];
        }
        error = new Error(
          printingFunction.apply(undefined, [format].concat(params)),
        );

        error.name = 'Invariant Violation';

        error.messageWithParams = [format].concat(params);
      }

      error.framesToPop = 1;
      throw error;
    }
  }

  var PUNCT_CHAR_CLASS =
    '[.!?' +
    '\u3002' +
    '\uFF01' +
    '\uFF1F' +
    '\u0964' +
    '\u2026' +
    '\u0EAF' +
    '\u1801' +
    '\u0E2F' +
    '\uFF0E' +
    ']';

  var ENDS_IN_PUNCT_REGEXP = new RegExp(
    PUNCT_CHAR_CLASS +
      '[)"\'' +
      '\xBB' +
      '\u0F3B' +
      '\u0F3D' +
      '\u2019' +
      '\u201D' +
      '\u203A' +
      '\u3009' +
      '\u300B' +
      '\u300D' +
      '\u300F' +
      '\u3011' +
      '\u3015' +
      '\u3017' +
      '\u3019' +
      '\u301B' +
      '\u301E' +
      '\u301F' +
      '\uFD3F' +
      '\uFF07' +
      '\uFF09' +
      '\uFF3D' +
      '\\s' +
      ']*$',
  );

  var _getPhonologicalRules = memoize(function() {
    var rules = [];

    for (var pattern in IntlPhonologicalRules.patterns) {
      var replacement = IntlPhonologicalRules.patterns[pattern];

      for (var metaclass in IntlPhonologicalRules.meta) {
        var metaclassRegexp = new RegExp(metaclass.slice(1, -1), 'g');
        var characterClass = IntlPhonologicalRules.meta[metaclass];
        pattern = pattern.replace(metaclassRegexp, characterClass);
        replacement = replacement.replace(metaclassRegexp, characterClass);
      }
      if (replacement === 'javascript') {
        replacement = function replacement(match) {
          return match.slice(1).toLowerCase();
        };
      }
      rules.push([new RegExp(pattern.slice(1, -1), 'g'), replacement]);
    }

    return rules;
  });

  function applyPhonologicalRules(text) {
    var rules = _getPhonologicalRules();

    for (var i = 0; i < rules.length; i++) {
      var _rules$i = rules[i],
        regexp = _rules$i[0],
        replacement = _rules$i[1];

      text = text.replace(regexp, replacement);
    }

    return text.replace(/\x01/g, '');
  }

  function endsInPunct(str) {
    if (typeof str !== 'string') {
      return false;
    }
    return ENDS_IN_PUNCT_REGEXP.test(str);
  }

  var Intl = {
    PUNCT_CHAR_CLASS: PUNCT_CHAR_CLASS,
    endsInPunct: endsInPunct,
    applyPhonologicalRules: applyPhonologicalRules,
  };

  var parameterRegexp = new RegExp(
    '\\{([^}]+)\\}(' + Intl.PUNCT_CHAR_CLASS + '*)',
    'g',
  );

  function markAsSafeForReact(object) {
    if (false) {
      var storeKey = '_store';

      if (
        object.type &&
        _typeof(object.props) === 'object' &&
        _typeof(object[storeKey]) === 'object' &&
        typeof object[storeKey].validated === 'boolean'
      ) {
        object[storeKey].validated = true;
      }
    }
    return object;
  }

  function substituteTokens(template, _args) {
    var args = _args;

    if (!args) {
      return template;
    }

    var objectPieces = [];
    var argNames = [];
    var stringPieces = template
      .replace(parameterRegexp, function(match, parameter, punctuation) {
        if (false) {
          if (!args.hasOwnProperty(parameter)) {
            throw new Error(
              'Translatable string expects parameter ' + parameter,
            );
          }
        }

        var argument = args[parameter];
        if (
          argument &&
          (typeof argument === 'undefined'
            ? 'undefined'
            : _typeof(argument)) === 'object'
        ) {
          objectPieces.push(argument);
          argNames.push(parameter);

          return '\x17' + punctuation;
        } else if (argument === null) {
          return '';
        }
        return argument + (Intl.endsInPunct(argument) ? '' : punctuation);
      })
      .split('\x17')
      .map(Intl.applyPhonologicalRules);

    if (stringPieces.length === 1) {
      return stringPieces[0];
    }

    var pieces = [stringPieces[0]];
    for (var i = 0; i < objectPieces.length; i++) {
      pieces.push(markAsSafeForReact(objectPieces[i]), stringPieces[i + 1]);
    }
    return pieces;
  }

  var ARG = {
    INDEX: 0,
    SUBSTITUTION: 1,
  };

  var VARIATIONS = {
    NUMBER: 0,
    GENDER: 1,
  };

  var PRONOUN_USAGE = {
    OBJECT: 0,
    POSSESSIVE: 1,
    REFLEXIVE: 2,
    SUBJECT: 3,
  };

  var EXACTLY_ONE = '_1';

  var _cachedFbtResults = {};

  function fbt() {}

  fbt._ = function(table, args) {
    var allSubstitutions = {};
    var pattern = table;

    if (table.__vcg) {
      args = args || [];
      args.unshift([[IntlViewerContext.GENDER, '*'], null]);
    }

    if (args) {
      pattern = this._accessTable(table, allSubstitutions, args, 0);
    }

    var patternString = pattern;
    var patternHash = null;

    if (Array.isArray(pattern)) {
      patternString = pattern[0];
      patternHash = pattern[1];

      var stringID = '1_' + patternHash;
      patternString = overrides[stringID] || patternString;
      if (overrides[stringID]) {
        fbt.logQTImpression(patternHash);
      }
      fbt.logImpression(patternHash);
    }
    var cachedFbt = _cachedFbtResults[patternString];
    var hasSubstitutions = this._hasKeys(allSubstitutions);
    if (cachedFbt && !hasSubstitutions) {
      return cachedFbt;
    } else {
      var fbtContent = substituteTokens(patternString, allSubstitutions);
      var result = wrapContent(fbtContent, patternString, patternHash);
      if (!hasSubstitutions) {
        //  _cachedFbtResults[patternString] = result;
      }
      return result;
    }
  };

  if (false) {
    fbt._getCachedFbt = function(s) {
      //  return _cachedFbtResults[s];
    };
  }

  fbt._hasKeys = function(o) {
    for (var k in o) {
      return true;
    }
    return false;
  };

  fbt._accessTable = function(table, substitutions, args, argsIndex) {
    if (argsIndex >= args.length) {
      return table;
    } else if (table == null) {
      return null;
    }
    var pattern = null;
    var arg = args[argsIndex];
    var tableIndex = arg[ARG.INDEX];

    if (Array.isArray(tableIndex)) {
      for (var k = 0; k < tableIndex.length; ++k) {
        var subTable = table[tableIndex[k]];
        pattern = this._accessTable(
          subTable,
          substitutions,
          args,
          argsIndex + 1,
        );

        if (pattern != null) {
          break;
        }
      }
    } else {
      table = tableIndex !== null ? table[tableIndex] : table;
      pattern = this._accessTable(table, substitutions, args, argsIndex + 1);
    }
    if (pattern != null) {
      babelHelpers.extends(substitutions, arg[ARG.SUBSTITUTION]);
    }
    return pattern;
  };

  function _getNumberVariations(number) {
    if (IntlHoldoutGK.inIntlHoldout) {
      return number === 1 ? [EXACTLY_ONE, '*'] : ['*'];
    }
    var numberType = FbtNumberType.getNumberVariationType(number);

    return number === 1 ? [EXACTLY_ONE, numberType, '*'] : [numberType, '*'];
  }

  function _getGenderVariation(gender) {
    if (IntlHoldoutGK.inIntlHoldout) {
      return ['*'];
    }

    return [gender, '*'];
  }

  fbt._enum = fbt['enum'] = function(value, range) {
    if (false) {
    }
    return [value, null];
  };

  fbt._subject = fbt.subject = function(value) {
    return [_getGenderVariation(value), null];
  };

  fbt._param = fbt.param = function(label, value, variations) {
    var variation = null;
    var format_as_number = false;
    if (variations) {
      if (variations[0] === VARIATIONS.NUMBER) {
        var number = variations.length > 1 ? variations[1] : value;

        variation = _getNumberVariations(number);
        format_as_number = true;
      } else if (variations[0] === VARIATIONS.GENDER) {
        variation = _getGenderVariation(variations[1]);
      } else {
      }
    }
    var substitution = {};
    substitution[label] =
      format_as_number && typeof value === 'number'
        ? intlNumUtils.formatNumberWithThousandDelimiters(value)
        : value;
    return [variation, substitution];
  };

  fbt._plural = fbt.plural = function(count, label, value) {
    var variation = _getNumberVariations(count);
    var substitution = {};
    if (label) {
      if (typeof value === 'number') {
        substitution[label] = intlNumUtils.formatNumberWithThousandDelimiters(
          value,
        );
      } else {
        substitution[label] =
          value || intlNumUtils.formatNumberWithThousandDelimiters(count);
      }
    }
    return [variation, substitution];
  };

  fbt._pronoun = fbt.pronoun = function(usage, gender, options) {
    var genderKey = getPronounGenderKey(usage, gender);
    return [[genderKey, '*'], null];
  };

  function getPronounGenderKey(usage, gender) {
    switch (gender) {
      case GenderConst.NOT_A_PERSON:
        return usage === PRONOUN_USAGE.OBJECT ||
          usage === PRONOUN_USAGE.REFLEXIVE
          ? GenderConst.NOT_A_PERSON
          : GenderConst.UNKNOWN_PLURAL;

      case GenderConst.FEMALE_SINGULAR:
      case GenderConst.FEMALE_SINGULAR_GUESS:
        return GenderConst.FEMALE_SINGULAR;

      case GenderConst.MALE_SINGULAR:
      case GenderConst.MALE_SINGULAR_GUESS:
        return GenderConst.MALE_SINGULAR;

      case GenderConst.MIXED_SINGULAR:
      case GenderConst.FEMALE_PLURAL:
      case GenderConst.MALE_PLURAL:
      case GenderConst.NEUTER_PLURAL:
      case GenderConst.UNKNOWN_PLURAL:
        return GenderConst.UNKNOWN_PLURAL;

      case GenderConst.NEUTER_SINGULAR:
      case GenderConst.UNKNOWN_SINGULAR:
        return usage === PRONOUN_USAGE.REFLEXIVE
          ? GenderConst.NOT_A_PERSON
          : GenderConst.UNKNOWN_PLURAL;
    }

    return GenderConst.NOT_A_PERSON;
  }

  fbt._name = function(label, value, gender) {
    var variation = _getGenderVariation(gender);
    var substitution = {};
    substitution[label] = value;
    return [variation, substitution];
  };

  fbt.logImpression = function(hash) {
    return hash;
  };

  fbt.logQTImpression = function(hash) {
    return hash;
  };

  function wrapContent(fbtContent, patternString, patternHash) {
    if (
      !FbtResultGK.shouldReturnFbtResult &&
      FbtResultGK.inlineMode !== 'REPORT'
    ) {
      return fbtContent;
    }

    var contents = typeof fbtContent === 'string' ? [fbtContent] : fbtContent;
    if (FbtResultGK.inlineMode && FbtResultGK.inlineMode !== 'NO_INLINE') {
      return new InlineFbtResult(
        contents,
        FbtResultGK.inlineMode,
        patternString,
        patternHash,
      );
    }
    return new FbtResult(contents);
  }

  return fbt;
})();