const { CreatePaymentManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class CreatePaymentRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super("createPayment", "createpayment", req, res);
    this.dataName = "payment";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreatePaymentManager(this._req, "rest");
  }
}

const createPayment = async (req, res, next) => {
  const controller = new CreatePaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createPayment;
