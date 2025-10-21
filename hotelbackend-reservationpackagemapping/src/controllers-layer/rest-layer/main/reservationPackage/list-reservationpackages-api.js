const { ListReservationPackagesManager } = require("apiLayer");

const ReservationPackageMappingRestController = require("../../ReservationPackageMappingServiceRestController");

class ListReservationPackagesRestController extends ReservationPackageMappingRestController {
  constructor(req, res) {
    super("listReservationPackages", "listreservationpackages", req, res);
    this.dataName = "reservationPackages";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListReservationPackagesManager(this._req, "rest");
  }
}

const listReservationPackages = async (req, res, next) => {
  const controller = new ListReservationPackagesRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listReservationPackages;
