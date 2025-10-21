const { GetRoomPriceManager } = require("apiLayer");

const RoomPricingRestController = require("../../RoomPricingServiceRestController");

class GetRoomPriceRestController extends RoomPricingRestController {
  constructor(req, res) {
    super("getRoomPrice", "getroomprice", req, res);
    this.dataName = "roomPrice";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetRoomPriceManager(this._req, "rest");
  }
}

const getRoomPrice = async (req, res, next) => {
  const controller = new GetRoomPriceRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getRoomPrice;
