const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const PaymentManagementServiceManager = require("../../service-manager/PaymentManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Payment */
class PaymentManager extends PaymentManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "payment";
    this.modelName = "Payment";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = PaymentManager;
