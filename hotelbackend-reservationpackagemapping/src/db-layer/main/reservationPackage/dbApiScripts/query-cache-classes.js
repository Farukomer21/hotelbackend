const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ReservationPackageQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("reservationPackage", [], Op.and, Op.eq, input, wClause);
  }
}

class ReservationPackageQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("reservationPackage", []);
  }
}

module.exports = {
  ReservationPackageQueryCache,
  ReservationPackageQueryCacheInvalidator,
};
