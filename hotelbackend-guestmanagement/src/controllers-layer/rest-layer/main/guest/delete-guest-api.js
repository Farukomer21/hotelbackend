const { DeleteGuestManager } = require("apiLayer");

const GuestManagementRestController = require("../../GuestManagementServiceRestController");

class DeleteGuestRestController extends GuestManagementRestController {
  constructor(req, res) {
    super("deleteGuest", "deleteguest", req, res);
    this.dataName = "guest";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteGuestManager(this._req, "rest");
  }
}

const deleteGuest = async (req, res, next) => {
  const controller = new DeleteGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteGuest;
