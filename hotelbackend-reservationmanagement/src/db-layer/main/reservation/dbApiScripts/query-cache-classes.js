const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ReservationQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("reservation", ["reservationCode"], Op.and, Op.eq, input, wClause);
  }
}

class ReservationQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("reservation", ["reservationCode"]);
  }
}

module.exports = {
  ReservationQueryCache,
  ReservationQueryCacheInvalidator,
};
