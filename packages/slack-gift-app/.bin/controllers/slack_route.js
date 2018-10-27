"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get("/", function (req, res) {
  res.send("Slack Receiver!");
});
router.get("/receive", function (req, res) {
  res.send("Slack Receiver!");
});
module.exports = router;