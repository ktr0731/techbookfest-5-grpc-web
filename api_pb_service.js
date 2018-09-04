// package: api
// file: api.proto

var api_pb = require("./api_pb");
var grpc = require("grpc-web-client").grpc;

var SimpleService = (function () {
  function SimpleService() {}
  SimpleService.serviceName = "api.SimpleService";
  return SimpleService;
}());

SimpleService.Unary = {
  methodName: "Unary",
  service: SimpleService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SimpleRequest,
  responseType: api_pb.SimpleResponse
};

SimpleService.ClientStreaming = {
  methodName: "ClientStreaming",
  service: SimpleService,
  requestStream: true,
  responseStream: false,
  requestType: api_pb.SimpleRequest,
  responseType: api_pb.SimpleResponse
};

SimpleService.ServerStreaming = {
  methodName: "ServerStreaming",
  service: SimpleService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.SimpleRequest,
  responseType: api_pb.SimpleResponse
};

SimpleService.BidiStreaming = {
  methodName: "BidiStreaming",
  service: SimpleService,
  requestStream: true,
  responseStream: true,
  requestType: api_pb.SimpleRequest,
  responseType: api_pb.SimpleResponse
};

exports.SimpleService = SimpleService;

function SimpleServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SimpleServiceClient.prototype.unary = function unary(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(SimpleService.Unary, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

SimpleService.prototype.clientStreaming = function clientStreaming() {
  throw new Error("Bi-directional streaming is not currently supported");
}

SimpleServiceClient.prototype.serverStreaming = function serverStreaming(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(SimpleService.ServerStreaming, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

SimpleService.prototype.bidiStreaming = function bidiStreaming() {
  throw new Error("Client streaming is not currently supported");
}

exports.SimpleServiceClient = SimpleServiceClient;

