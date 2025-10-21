const { UpdateRoomManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class UpdateRoomRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("updateRoom", "updateroom", req, res);
    this.dataName = "room";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateRoomManager(this._req, "rest");
  }
}

const updateRoom = async (req, res, next) => {
  const controller = new UpdateRoomRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateRoom;
