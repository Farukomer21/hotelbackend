const { CreateReservationPackageManager } = require("apiLayer");

const ReservationPackageMappingRestController = require("../../ReservationPackageMappingServiceRestController");

class CreateReservationPackageRestController extends ReservationPackageMappingRestController {
  constructor(req, res) {
    super("createReservationPackage", "createreservationpackage", req, res);
    this.dataName = "reservationPackage";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateReservationPackageManager(this._req, "rest");
  }
}

const createReservationPackage = async (req, res, next) => {
  const controller = new CreateReservationPackageRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createReservationPackage;
