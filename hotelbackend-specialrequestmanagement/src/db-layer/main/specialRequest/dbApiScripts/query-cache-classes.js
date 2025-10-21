const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class SpecialRequestQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("specialRequest", [], Op.and, Op.eq, input, wClause);
  }
}

class SpecialRequestQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("specialRequest", []);
  }
}

module.exports = {
  SpecialRequestQueryCache,
  SpecialRequestQueryCacheInvalidator,
};
