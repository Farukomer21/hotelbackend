const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoFile = path.join(
  __dirname,
  "controllers-layer",
  "grpc-layer",
  "proto",
  "feedbackManagement.proto",
);

console.log("Loading proto file from:", protoFile);
try {
  const stats = require("fs").statSync(protoFile);
  console.log("Proto file exists, size:", stats.size, "bytes");
} catch (err) {
  console.error("Error accessing proto file:", err.message);
  //**errorLog
}

const { getSessionRouter } = require("grpcLayer");
const sessionRouter = getSessionRouter();

const packageDef = protoLoader.loadSync(protoFile, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const feedbackManagementPackage = grpcObject.feedbackManagement;

const server = new grpc.Server();

function helloMessage(call, callback) {
  callback(null, {
    hello: "hello, this is hotelbackend-feedbackmanagement-service",
  });
}

const {} = require("./controllers-layer/grpc-layer");

server.addService(feedbackManagementPackage.feedbackManagementService.service, {
  helloMessage,
  ...sessionRouter,
});

module.exports = server;
