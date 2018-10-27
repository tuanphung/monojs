"use strict";

var _cluster = _interopRequireDefault(require("cluster"));

var _express = _interopRequireDefault(require("express"));

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numCPUs = process.env.NODE_SINGLE_CORE == 1 ? 1 : require("os").cpus().length;

if (_cluster.default.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    var env = {// Custom env here
    };

    _cluster.default.fork(env);
  }

  _cluster.default.on("exit", function (worker, code, signal) {
    console.log("worker ".concat(worker.process.pid, " died ").concat(code, " ").concat(signal));
  });
} else {
  startExpressServer();
}

function startExpressServer() {
  var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "production";
  var app = (0, _express.default)();
  app.listen(port, function () {
    return console.log("App listening on port ".concat(port, "!"));
  });
  app.get("/", function (req, res) {
    res.send("MONOREPO2");
  });
  app.use(_controllers.default);
}