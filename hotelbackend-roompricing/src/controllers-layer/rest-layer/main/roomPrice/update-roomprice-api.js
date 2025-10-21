const { UpdateRoomPriceManager } = require("apiLayer");

const RoomPricingRestController = require("../../RoomPricingServiceRestController");

class UpdateRoomPriceRestController extends RoomPricingRestController {
  constructor(req, res) {
    super("updateRoomPrice", "updateroomprice", req, res);
    this.dataName = "roomPrice";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateRoomPriceManager(this._req, "rest");
  }
}

const updateRoomPrice = async (req, res, next) => {
  const controller = new UpdateRoomPriceRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateRoomPrice;
