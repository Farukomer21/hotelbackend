const { CreateReservationManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class CreateReservationRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("createReservation", "createreservation", req, res);
    this.dataName = "reservation";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateReservationManager(this._req, "rest");
  }
}

const createReservation = async (req, res, next) => {
  const controller = new CreateReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createReservation;
