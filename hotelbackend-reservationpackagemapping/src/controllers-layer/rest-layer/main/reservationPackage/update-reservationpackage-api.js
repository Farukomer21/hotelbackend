const { UpdateReservationPackageManager } = require("apiLayer");

const ReservationPackageMappingRestController = require("../../ReservationPackageMappingServiceRestController");

class UpdateReservationPackageRestController extends ReservationPackageMappingRestController {
  constructor(req, res) {
    super("updateReservationPackage", "updatereservationpackage", req, res);
    this.dataName = "reservationPackage";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateReservationPackageManager(this._req, "rest");
  }
}

const updateReservationPackage = async (req, res, next) => {
  const controller = new UpdateReservationPackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateReservationPackage;
