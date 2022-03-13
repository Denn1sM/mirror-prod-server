Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = Day;

const _react = _interopRequireDefault(require('react'));

const _propTypes = _interopRequireDefault(require('prop-types'));

const _dateUtils = require('@wojtekmaj/date-utils');

const _Tile = _interopRequireDefault(require('../Tile'));

const _dates = require('../shared/dates');

const _dateFormatter = require('../shared/dateFormatter');

const _propTypes2 = require('../shared/propTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter((sym) => Object.getOwnPropertyDescriptor(object, sym).enumerable);
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach((key) => {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach((key) => {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value, enumerable: true, configurable: true, writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  const target = _objectWithoutPropertiesLoose(source, excluded);
  let key; let
    i;
  if (Object.getOwnPropertySymbols) {
    const sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  const target = {};
  const sourceKeys = Object.keys(source);
  let key; let
    i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const className = 'react-calendar__month-view__days__day';

function Day(_ref) {
  const _ref$formatLongDate = _ref.formatLongDate;
  const formatLongDate = _ref$formatLongDate === void 0 ? _dateFormatter.formatLongDate : _ref$formatLongDate;
  const { calendarType } = _ref;
  const { classes } = _ref;
  const { currentMonthIndex } = _ref;
  const otherProps = _objectWithoutProperties(_ref, ['formatLongDate', 'calendarType', 'classes', 'currentMonthIndex']);

  const { date } = otherProps;
  return /* #__PURE__ */_react.default.createElement(_Tile.default, {
    ...otherProps,
    classes: [].concat(classes, className, (0, _dates.isWeekend)(date, calendarType) ? ''.concat(className, '--weekend') : null, date.getMonth() !== currentMonthIndex ? ''.concat(className, '--neighboringMonth') : null),
    formatAbbr: formatLongDate,
    maxDateTransform: _dateUtils.getDayEnd,
    minDateTransform: _dateUtils.getDayStart,
    view: 'month',
  }, (0, _dateUtils.getDate)(date));
}

Day.propTypes = _objectSpread(_objectSpread({}, _propTypes2.tileProps), {}, {
  currentMonthIndex: _propTypes.default.number.isRequired,
  formatLongDate: _propTypes.default.func,
});
