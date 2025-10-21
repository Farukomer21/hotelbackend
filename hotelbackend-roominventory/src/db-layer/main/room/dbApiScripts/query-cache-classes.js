const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class RoomQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("room", [], Op.and, Op.eq, input, wClause);
  }
}

class RoomQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("room", []);
  }
}

module.exports = {
  RoomQueryCache,
  RoomQueryCacheInvalidator,
};
