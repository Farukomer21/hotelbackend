const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const GuestManagementServiceManager = require("../../service-manager/GuestManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Guest */
class GuestManager extends GuestManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "guest";
    this.modelName = "Guest";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = GuestManager;
