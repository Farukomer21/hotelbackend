const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class RoomInventoryServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-roominventory-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = RoomInventoryServiceManager;
