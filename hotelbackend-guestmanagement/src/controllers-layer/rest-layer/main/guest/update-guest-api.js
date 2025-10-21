const { UpdateGuestManager } = require("apiLayer");

const GuestManagementRestController = require("../../GuestManagementServiceRestController");

class UpdateGuestRestController extends GuestManagementRestController {
  constructor(req, res) {
    super("updateGuest", "updateguest", req, res);
    this.dataName = "guest";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateGuestManager(this._req, "rest");
  }
}

const updateGuest = async (req, res, next) => {
  const controller = new UpdateGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateGuest;
