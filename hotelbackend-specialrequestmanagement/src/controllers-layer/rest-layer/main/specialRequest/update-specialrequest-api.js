const { UpdateSpecialRequestManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class UpdateSpecialRequestRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("updateSpecialRequest", "updatespecialrequest", req, res);
    this.dataName = "specialRequest";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateSpecialRequestManager(this._req, "rest");
  }
}

const updateSpecialRequest = async (req, res, next) => {
  const controller = new UpdateSpecialRequestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateSpecialRequest;
