const { CancelReservationByCodeManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class CancelReservationByCodeRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("cancelReservationByCode", "cancelreservationbycode", req, res);
    this.dataName = "reservation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new CancelReservationByCodeManager(this._req, "rest");
  }
}

const cancelReservationByCode = async (req, res, next) => {
  const controller = new CancelReservationByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = cancelReservationByCode;
