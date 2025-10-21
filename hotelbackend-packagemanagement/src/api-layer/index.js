module.exports = {
  PackageManagementServiceManager: require("./service-manager/PackageManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Package_ Db Object
  CreatePackageManager: require("./main/package_/create-package_-api"),
  UpdatePackageManager: require("./main/package_/update-package_-api"),
  DeletePackageManager: require("./main/package_/delete-package_-api"),
  GetPackageManager: require("./main/package_/get-package_-api"),
  ListPackagesManager: require("./main/package_/list-packages-api"),
  integrationRouter: require("./integrations/testRouter"),
};
