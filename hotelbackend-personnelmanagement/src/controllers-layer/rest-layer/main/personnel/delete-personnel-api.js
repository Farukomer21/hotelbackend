const { DeletePersonnelManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class DeletePersonnelRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("deletePersonnel", "deletepersonnel", req, res);
    this.dataName = "personnel";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeletePersonnelManager(this._req, "rest");
  }
}

const deletePersonnel = async (req, res, next) => {
  const controller = new DeletePersonnelRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deletePersonnel;
