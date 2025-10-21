const { UpdatePersonnelManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class UpdatePersonnelRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("updatePersonnel", "updatepersonnel", req, res);
    this.dataName = "personnel";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdatePersonnelManager(this._req, "rest");
  }
}

const updatePersonnel = async (req, res, next) => {
  const controller = new UpdatePersonnelRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updatePersonnel;
