const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class FeedbackQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("feedback", [], Op.and, Op.eq, input, wClause);
  }
}

class FeedbackQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("feedback", []);
  }
}

module.exports = {
  FeedbackQueryCache,
  FeedbackQueryCacheInvalidator,
};
