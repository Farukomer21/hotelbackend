const { CreateSpecialRequestManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class CreateSpecialRequestRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("createSpecialRequest", "createspecialrequest", req, res);
    this.dataName = "specialRequest";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateSpecialRequestManager(this._req, "rest");
  }
}

const createSpecialRequest = async (req, res, next) => {
  const controller = new CreateSpecialRequestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createSpecialRequest;
