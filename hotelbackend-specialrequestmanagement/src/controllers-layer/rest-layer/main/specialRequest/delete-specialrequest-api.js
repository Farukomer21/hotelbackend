const { DeleteSpecialRequestManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class DeleteSpecialRequestRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("deleteSpecialRequest", "deletespecialrequest", req, res);
    this.dataName = "specialRequest";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteSpecialRequestManager(this._req, "rest");
  }
}

const deleteSpecialRequest = async (req, res, next) => {
  const controller = new DeleteSpecialRequestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteSpecialRequest;
