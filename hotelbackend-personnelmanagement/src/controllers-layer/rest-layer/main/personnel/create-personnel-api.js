const { CreatePersonnelManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class CreatePersonnelRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("createPersonnel", "createpersonnel", req, res);
    this.dataName = "personnel";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreatePersonnelManager(this._req, "rest");
  }
}

const createPersonnel = async (req, res, next) => {
  const controller = new CreatePersonnelRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createPersonnel;
