const { GetPackageManager } = require("apiLayer");

const PackageManagementRestController = require("../../PackageManagementServiceRestController");

class GetPackageRestController extends PackageManagementRestController {
  constructor(req, res) {
    super("getPackage", "getpackage", req, res);
    this.dataName = "package_";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPackageManager(this._req, "rest");
  }
}

const getPackage = async (req, res, next) => {
  const controller = new GetPackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPackage;
