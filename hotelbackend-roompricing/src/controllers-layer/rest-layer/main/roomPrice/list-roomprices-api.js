const { ListRoomPricesManager } = require("apiLayer");

const RoomPricingRestController = require("../../RoomPricingServiceRestController");

class ListRoomPricesRestController extends RoomPricingRestController {
  constructor(req, res) {
    super("listRoomPrices", "listroomprices", req, res);
    this.dataName = "roomPrices";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListRoomPricesManager(this._req, "rest");
  }
}

const listRoomPrices = async (req, res, next) => {
  const controller = new ListRoomPricesRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listRoomPrices;
