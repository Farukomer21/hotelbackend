const { CreateGuestManager } = require("apiLayer");

const GuestManagementRestController = require("../../GuestManagementServiceRestController");

class CreateGuestRestController extends GuestManagementRestController {
  constructor(req, res) {
    super("createGuest", "createguest", req, res);
    this.dataName = "guest";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateGuestManager(this._req, "rest");
  }
}

const createGuest = async (req, res, next) => {
  const controller = new CreateGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createGuest;
