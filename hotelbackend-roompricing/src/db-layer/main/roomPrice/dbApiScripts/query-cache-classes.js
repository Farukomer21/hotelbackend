const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class RoomPriceQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("roomPrice", [], Op.and, Op.eq, input, wClause);
  }
}

class RoomPriceQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("roomPrice", []);
  }
}

module.exports = {
  RoomPriceQueryCache,
  RoomPriceQueryCacheInvalidator,
};
