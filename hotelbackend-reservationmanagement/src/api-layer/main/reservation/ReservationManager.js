const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReservationManagementServiceManager = require("../../service-manager/ReservationManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Reservation */
class ReservationManager extends ReservationManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "reservation";
    this.modelName = "Reservation";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ReservationManager;
