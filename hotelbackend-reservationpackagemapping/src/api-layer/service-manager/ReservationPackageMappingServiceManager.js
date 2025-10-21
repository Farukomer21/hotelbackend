const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class ReservationPackageMappingServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-reservationpackagemapping-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = ReservationPackageMappingServiceManager;
