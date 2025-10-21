const { DeleteReservationManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class DeleteReservationRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("deleteReservation", "deletereservation", req, res);
    this.dataName = "reservation";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteReservationManager(this._req, "rest");
  }
}

const deleteReservation = async (req, res, next) => {
  const controller = new DeleteReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteReservation;
