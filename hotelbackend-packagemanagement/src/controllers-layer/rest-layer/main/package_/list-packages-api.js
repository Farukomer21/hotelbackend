const { ListPackagesManager } = require("apiLayer");

const PackageManagementRestController = require("../../PackageManagementServiceRestController");

class ListPackagesRestController extends PackageManagementRestController {
  constructor(req, res) {
    super("listPackages", "listpackages", req, res);
    this.dataName = "package_s";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPackagesManager(this._req, "rest");
  }
}

const listPackages = async (req, res, next) => {
  const controller = new ListPackagesRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPackages;
