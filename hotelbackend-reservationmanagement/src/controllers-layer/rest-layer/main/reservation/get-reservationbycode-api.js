const { GetReservationByCodeManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class GetReservationByCodeRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("getReservationByCode", "getreservationbycode", req, res);
    this.dataName = "reservation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetReservationByCodeManager(this._req, "rest");
  }
}

const getReservationByCode = async (req, res, next) => {
  const controller = new GetReservationByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getReservationByCode;
