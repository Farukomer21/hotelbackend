const { GetPersonnelManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class GetPersonnelRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("getPersonnel", "getpersonnel", req, res);
    this.dataName = "personnel";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPersonnelManager(this._req, "rest");
  }
}

const getPersonnel = async (req, res, next) => {
  const controller = new GetPersonnelRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPersonnel;
