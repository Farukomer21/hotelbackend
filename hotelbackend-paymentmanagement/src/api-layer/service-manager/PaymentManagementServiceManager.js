const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class PaymentManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-paymentmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = PaymentManagementServiceManager;
