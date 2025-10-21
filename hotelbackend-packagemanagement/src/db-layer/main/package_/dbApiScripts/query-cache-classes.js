const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class Package_QueryCache extends QueryCache {
  constructor(input, wClause) {
    super("package_", [], Op.and, Op.eq, input, wClause);
  }
}

class Package_QueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("package_", []);
  }
}

module.exports = {
  Package_QueryCache,
  Package_QueryCacheInvalidator,
};
