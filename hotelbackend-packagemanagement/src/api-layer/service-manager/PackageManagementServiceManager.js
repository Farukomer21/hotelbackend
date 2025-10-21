const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class PackageManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-packagemanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = PackageManagementServiceManager;
