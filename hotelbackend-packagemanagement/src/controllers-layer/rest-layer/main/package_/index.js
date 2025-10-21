const express = require("express");

// Package_ Db Object Rest Api Router
const package_Router = express.Router();

// add Package_ controllers

// createPackage controller
package_Router.post("/v1/package_s", require("./create-package_-api"));
// updatePackage controller
package_Router.patch(
  "/v1/package_s/:package_Id",
  require("./update-package_-api"),
);
// deletePackage controller
package_Router.delete(
  "/v1/package_s/:package_Id",
  require("./delete-package_-api"),
);
// getPackage controller
package_Router.get("/v1/package_s/:package_Id", require("./get-package_-api"));
// listPackages controller
package_Router.get("/v1/packages", require("./list-packages-api"));

module.exports = package_Router;
