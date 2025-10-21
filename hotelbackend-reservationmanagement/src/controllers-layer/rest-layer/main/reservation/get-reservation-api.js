const { GetReservationByIdManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class GetReservationByIdRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("getReservationById", "getreservationbyid", req, res);
    this.dataName = "reservation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetReservationByIdManager(this._req, "rest");
  }
}

const getReservationById = async (req, res, next) => {
  const controller = new GetReservationByIdRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getReservationById;
