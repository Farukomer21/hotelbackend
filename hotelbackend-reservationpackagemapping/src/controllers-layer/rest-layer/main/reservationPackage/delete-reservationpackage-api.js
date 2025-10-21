const { DeleteReservationPackageManager } = require("apiLayer");

const ReservationPackageMappingRestController = require("../../ReservationPackageMappingServiceRestController");

class DeleteReservationPackageRestController extends ReservationPackageMappingRestController {
  constructor(req, res) {
    super("deleteReservationPackage", "deletereservationpackage", req, res);
    this.dataName = "reservationPackage";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteReservationPackageManager(this._req, "rest");
  }
}

const deleteReservationPackage = async (req, res, next) => {
  const controller = new DeleteReservationPackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteReservationPackage;
