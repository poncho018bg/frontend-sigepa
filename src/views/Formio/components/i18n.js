"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _en = _interopRequireDefault(require("../en"));

var _utils = require("formiojs/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  lng: 'en',
  nsSeparator: '::',
  keySeparator: '.|.',
  pluralSeparator: '._.',
  contextSeparator: '._.',
  resources: {
    en: {
      translation: (0, _utils.fastCloneDeep)(_en.default)
    }
  }
};
exports.default = _default;