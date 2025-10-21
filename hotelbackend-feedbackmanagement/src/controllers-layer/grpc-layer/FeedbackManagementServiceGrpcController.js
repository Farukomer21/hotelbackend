const GrpcController = require("./GrpcController");

class FeedbackManagementServiceGrpcController extends GrpcController {
  constructor(name, routeName, call, callback) {
    super(name, routeName, call, callback);
    this.projectCodename = "hotelbackend";
    this.isMultiTenant = false;
    this.tenantName = "";
    this.tenantId = "";
    this.tenantCodename = null;
    this.isLoginApi = false;
  }

  createApiManager() {
    return null;
  }
}

module.exports = FeedbackManagementServiceGrpcController;
