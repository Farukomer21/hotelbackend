const express = require("express");

// Edge functions Rest Api Router
const edgeRouter = express.Router();

edgeRouter.get("/helloworld", require("./helloWorld-rest"));

module.exports = {
  edgeRouter,
};
