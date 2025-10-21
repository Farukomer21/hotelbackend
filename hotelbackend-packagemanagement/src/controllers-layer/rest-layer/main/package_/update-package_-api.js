const { UpdatePackageManager } = require("apiLayer");

const PackageManagementRestController = require("../../PackageManagementServiceRestController");

class UpdatePackageRestController extends PackageManagementRestController {
  constructor(req, res) {
    super("updatePackage", "updatepackage", req, res);
    this.dataName = "package_";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdatePackageManager(this._req, "rest");
  }
}

const updatePackage = async (req, res, next) => {
  const controller = new UpdatePackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updatePackage;
