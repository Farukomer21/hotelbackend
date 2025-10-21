const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const PersonnelManagementServiceManager = require("../../service-manager/PersonnelManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Personnel */
class PersonnelManager extends PersonnelManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "personnel";
    this.modelName = "Personnel";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = PersonnelManager;
