const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReservationPackageMappingServiceManager = require("../../service-manager/ReservationPackageMappingServiceManager");

/* Base Class For the Crud Routes Of DbObject ReservationPackage */
class ReservationPackageManager extends ReservationPackageMappingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "reservationPackage";
    this.modelName = "ReservationPackage";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ReservationPackageManager;
