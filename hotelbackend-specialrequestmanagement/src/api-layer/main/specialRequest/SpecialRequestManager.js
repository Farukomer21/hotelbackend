const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const SpecialRequestManagementServiceManager = require("../../service-manager/SpecialRequestManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject SpecialRequest */
class SpecialRequestManager extends SpecialRequestManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "specialRequest";
    this.modelName = "SpecialRequest";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = SpecialRequestManager;
