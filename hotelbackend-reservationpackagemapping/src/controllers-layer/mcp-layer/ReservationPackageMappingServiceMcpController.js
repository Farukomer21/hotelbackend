const McpController = require("./McpController");

class ReservationPackageMappingServiceMcpController extends McpController {
  constructor(name, routeName, req, res) {
    super(name, routeName, req, res);
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

module.exports = ReservationPackageMappingServiceMcpController;
