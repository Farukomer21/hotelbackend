const { ListGuestsManager } = require("apiLayer");

const GuestManagementRestController = require("../../GuestManagementServiceRestController");

class ListGuestsRestController extends GuestManagementRestController {
  constructor(req, res) {
    super("listGuests", "listguests", req, res);
    this.dataName = "guests";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListGuestsManager(this._req, "rest");
  }
}

const listGuests = async (req, res, next) => {
  const controller = new ListGuestsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listGuests;
