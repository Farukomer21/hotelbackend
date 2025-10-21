const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class RoomPricingServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-roompricing-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = RoomPricingServiceManager;
