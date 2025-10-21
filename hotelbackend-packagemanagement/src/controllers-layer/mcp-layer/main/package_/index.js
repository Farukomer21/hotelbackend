module.exports = (headers) => {
  // Package_ Db Object Rest Api Router
  const package_McpRouter = [];

  // createPackage controller
  package_McpRouter.push(require("./create-package_-api")(headers));
  // updatePackage controller
  package_McpRouter.push(require("./update-package_-api")(headers));
  // deletePackage controller
  package_McpRouter.push(require("./delete-package_-api")(headers));
  // getPackage controller
  package_McpRouter.push(require("./get-package_-api")(headers));
  // listPackages controller
  package_McpRouter.push(require("./list-packages-api")(headers));

  return package_McpRouter;
};
