const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const RoomPricingServiceManager = require("../../service-manager/RoomPricingServiceManager");

/* Base Class For the Crud Routes Of DbObject RoomPrice */
class RoomPriceManager extends RoomPricingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "roomPrice";
    this.modelName = "RoomPrice";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = RoomPriceManager;
