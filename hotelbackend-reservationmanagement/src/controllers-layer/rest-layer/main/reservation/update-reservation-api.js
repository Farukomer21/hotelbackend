const { UpdateReservationManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class UpdateReservationRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("updateReservation", "updatereservation", req, res);
    this.dataName = "reservation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateReservationManager(this._req, "rest");
  }
}

const updateReservation = async (req, res, next) => {
  const controller = new UpdateReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateReservation;
