const { ListPersonnelManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class ListPersonnelRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("listPersonnel", "listpersonnel", req, res);
    this.dataName = "personnels";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPersonnelManager(this._req, "rest");
  }
}

const listPersonnel = async (req, res, next) => {
  const controller = new ListPersonnelRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPersonnel;
