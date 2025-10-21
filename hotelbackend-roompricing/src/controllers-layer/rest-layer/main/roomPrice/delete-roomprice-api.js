const { DeleteRoomPriceManager } = require("apiLayer");

const RoomPricingRestController = require("../../RoomPricingServiceRestController");

class DeleteRoomPriceRestController extends RoomPricingRestController {
  constructor(req, res) {
    super("deleteRoomPrice", "deleteroomprice", req, res);
    this.dataName = "roomPrice";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteRoomPriceManager(this._req, "rest");
  }
}

const deleteRoomPrice = async (req, res, next) => {
  const controller = new DeleteRoomPriceRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteRoomPrice;
