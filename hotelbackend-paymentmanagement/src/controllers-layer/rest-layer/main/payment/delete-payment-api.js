const { DeletePaymentManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class DeletePaymentRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super("deletePayment", "deletepayment", req, res);
    this.dataName = "payment";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeletePaymentManager(this._req, "rest");
  }
}

const deletePayment = async (req, res, next) => {
  const controller = new DeletePaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deletePayment;
