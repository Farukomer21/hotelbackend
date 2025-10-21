const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class ReservationManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "hotelbackend-reservationmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = ReservationManagementServiceManager;
