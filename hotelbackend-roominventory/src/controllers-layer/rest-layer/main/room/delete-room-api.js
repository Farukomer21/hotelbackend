const { DeleteRoomManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class DeleteRoomRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("deleteRoom", "deleteroom", req, res);
    this.dataName = "room";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteRoomManager(this._req, "rest");
  }
}

const deleteRoom = async (req, res, next) => {
  const controller = new DeleteRoomRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteRoom;
