const { GetPaymentManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class GetPaymentRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super("getPayment", "getpayment", req, res);
    this.dataName = "payment";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPaymentManager(this._req, "rest");
  }
}

const getPayment = async (req, res, next) => {
  const controller = new GetPaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPayment;
