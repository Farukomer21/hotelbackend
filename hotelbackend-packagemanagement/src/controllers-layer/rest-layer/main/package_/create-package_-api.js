const { CreatePackageManager } = require("apiLayer");

const PackageManagementRestController = require("../../PackageManagementServiceRestController");

class CreatePackageRestController extends PackageManagementRestController {
  constructor(req, res) {
    super("createPackage", "createpackage", req, res);
    this.dataName = "package_";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreatePackageManager(this._req, "rest");
  }
}

const createPackage = async (req, res, next) => {
  const controller = new CreatePackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createPackage;
