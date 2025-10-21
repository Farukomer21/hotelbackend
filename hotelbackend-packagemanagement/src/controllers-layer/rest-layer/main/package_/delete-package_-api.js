const { DeletePackageManager } = require("apiLayer");

const PackageManagementRestController = require("../../PackageManagementServiceRestController");

class DeletePackageRestController extends PackageManagementRestController {
  constructor(req, res) {
    super("deletePackage", "deletepackage", req, res);
    this.dataName = "package_";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeletePackageManager(this._req, "rest");
  }
}

const deletePackage = async (req, res, next) => {
  const controller = new DeletePackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deletePackage;
