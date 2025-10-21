const { ListReservationsManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class ListReservationsRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("listReservations", "listreservations", req, res);
    this.dataName = "reservations";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListReservationsManager(this._req, "rest");
  }
}

const listReservations = async (req, res, next) => {
  const controller = new ListReservationsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listReservations;
