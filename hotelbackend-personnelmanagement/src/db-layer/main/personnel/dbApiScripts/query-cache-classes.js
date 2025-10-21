const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class PersonnelQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("personnel", [], Op.and, Op.eq, input, wClause);
  }
}

class PersonnelQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("personnel", []);
  }
}

module.exports = {
  PersonnelQueryCache,
  PersonnelQueryCacheInvalidator,
};
