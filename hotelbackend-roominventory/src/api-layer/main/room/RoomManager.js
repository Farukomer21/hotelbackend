const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const RoomInventoryServiceManager = require("../../service-manager/RoomInventoryServiceManager");

/* Base Class For the Crud Routes Of DbObject Room */
class RoomManager extends RoomInventoryServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "room";
    this.modelName = "Room";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = RoomManager;
