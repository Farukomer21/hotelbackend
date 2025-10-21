const { ListRoomsManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class ListRoomsRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("listRooms", "listrooms", req, res);
    this.dataName = "rooms";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListRoomsManager(this._req, "rest");
  }
}

const listRooms = async (req, res, next) => {
  const controller = new ListRoomsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listRooms;
