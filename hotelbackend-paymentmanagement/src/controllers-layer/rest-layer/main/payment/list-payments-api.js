const { ListPaymentsManager } = require("apiLayer");

const PaymentManagementRestController = require("../../PaymentManagementServiceRestController");

class ListPaymentsRestController extends PaymentManagementRestController {
  constructor(req, res) {
    super("listPayments", "listpayments", req, res);
    this.dataName = "payments";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPaymentsManager(this._req, "rest");
  }
}

const listPayments = async (req, res, next) => {
  const controller = new ListPaymentsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPayments;
