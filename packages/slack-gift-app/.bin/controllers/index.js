"use strict";

var _express = _interopRequireDefault(require("express"));

var _slack_route = _interopRequireDefault(require("./slack_route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use("/slack", _slack_route.default);
module.exports = router;

module.exports.testable = function (a, b) {
  return a + b;
};