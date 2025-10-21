const { GetGuestManager } = require("apiLayer");

const GuestManagementRestController = require("../../GuestManagementServiceRestController");

class GetGuestRestController extends GuestManagementRestController {
  constructor(req, res) {
    super("getGuest", "getguest", req, res);
    this.dataName = "guest";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetGuestManager(this._req, "rest");
  }
}

const getGuest = async (req, res, next) => {
  const controller = new GetGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getGuest;
