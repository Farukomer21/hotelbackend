const express = require("express");

// Personnel Db Object Rest Api Router
const personnelRouter = express.Router();

// add Personnel controllers

// createPersonnel controller
personnelRouter.post("/v1/personnels", require("./create-personnel-api"));
// getPersonnel controller
personnelRouter.get(
  "/v1/personnels/:personnelId",
  require("./get-personnel-api"),
);
// updatePersonnel controller
personnelRouter.patch(
  "/v1/personnels/:personnelId",
  require("./update-personnel-api"),
);
// deletePersonnel controller
personnelRouter.delete(
  "/v1/personnels/:personnelId",
  require("./delete-personnel-api"),
);
// listPersonnel controller
personnelRouter.get("/v1/personnels", require("./list-personnel-api"));

module.exports = personnelRouter;
