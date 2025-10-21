const { ListSpecialRequestsManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class ListSpecialRequestsRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("listSpecialRequests", "listspecialrequests", req, res);
    this.dataName = "specialRequests";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListSpecialRequestsManager(this._req, "rest");
  }
}

const listSpecialRequests = async (req, res, next) => {
  const controller = new ListSpecialRequestsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listSpecialRequests;
