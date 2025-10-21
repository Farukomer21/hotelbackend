const { UpdatePaymentManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class UpdatePaymentRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super("updatePayment", "updatepayment", req, res);
    this.dataName = "payment";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdatePaymentManager(this._req, "rest");
  }
}

const updatePayment = async (req, res, next) => {
  const controller = new UpdatePaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updatePayment;
