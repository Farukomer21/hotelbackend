const { GetRoomManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class GetRoomRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("getRoom", "getroom", req, res);
    this.dataName = "room";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetRoomManager(this._req, "rest");
  }
}

const getRoom = async (req, res, next) => {
  const controller = new GetRoomRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getRoom;
