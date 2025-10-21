const { CreateRoomManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class CreateRoomRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("createRoom", "createroom", req, res);
    this.dataName = "room";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateRoomManager(this._req, "rest");
  }
}

const createRoom = async (req, res, next) => {
  const controller = new CreateRoomRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createRoom;
