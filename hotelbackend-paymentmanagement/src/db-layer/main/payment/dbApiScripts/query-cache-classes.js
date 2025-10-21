const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class PaymentQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("payment", [], Op.and, Op.eq, input, wClause);
  }
}

class PaymentQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("payment", []);
  }
}

module.exports = {
  PaymentQueryCache,
  PaymentQueryCacheInvalidator,
};
