const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const PackageManagementServiceManager = require("../../service-manager/PackageManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Package_ */
class Package_Manager extends PackageManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "package_";
    this.modelName = "Package_";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = Package_Manager;
