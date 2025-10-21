const { GetSpecialRequestManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class GetSpecialRequestRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("getSpecialRequest", "getspecialrequest", req, res);
    this.dataName = "specialRequest";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetSpecialRequestManager(this._req, "rest");
  }
}

const getSpecialRequest = async (req, res, next) => {
  const controller = new GetSpecialRequestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getSpecialRequest;
