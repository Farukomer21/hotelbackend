const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class GuestQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("guest", [], Op.and, Op.eq, input, wClause);
  }
}

class GuestQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("guest", []);
  }
}

module.exports = {
  GuestQueryCache,
  GuestQueryCacheInvalidator,
};
