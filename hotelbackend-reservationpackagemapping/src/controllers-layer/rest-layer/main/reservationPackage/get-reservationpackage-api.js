const { GetReservationPackageManager } = require("apiLayer");

const ReservationPackageMappingRestController = require("../../ReservationPackageMappingServiceRestController");

class GetReservationPackageRestController extends ReservationPackageMappingRestController {
  constructor(req, res) {
    super("getReservationPackage", "getreservationpackage", req, res);
    this.dataName = "reservationPackage";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetReservationPackageManager(this._req, "rest");
  }
}

const getReservationPackage = async (req, res, next) => {
  const controller = new GetReservationPackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getReservationPackage;
