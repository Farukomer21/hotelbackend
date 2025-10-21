const { CreateRoomPriceManager } = require("apiLayer");

const RoomPricingRestController = require("../../RoomPricingServiceRestController");

class CreateRoomPriceRestController extends RoomPricingRestController {
  constructor(req, res) {
    super("createRoomPrice", "createroomprice", req, res);
    this.dataName = "roomPrice";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateRoomPriceManager(this._req, "rest");
  }
}

const createRoomPrice = async (req, res, next) => {
  const controller = new CreateRoomPriceRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createRoomPrice;
