const { GetPaymentsByReservationCodeManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class GetPaymentsByReservationCodeRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super(
      "getPaymentsByReservationCode",
      "getpaymentsbyreservationcode",
      req,
      res,
    );
    this.dataName = "payments";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPaymentsByReservationCodeManager(this._req, "rest");
  }
}

const getPaymentsByReservationCode = async (req, res, next) => {
  const controller = new GetPaymentsByReservationCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPaymentsByReservationCode;
