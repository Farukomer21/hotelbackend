const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const feedbackMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationId: { type: "keyword", index: true },
  rating: { type: "integer", index: true },
  comment: { type: "text", index: true },
  submittedAt: { type: "date", index: true },
  response: { type: "text", index: true },
  category: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("feedback", feedbackMapping);
    await new ElasticIndexer("feedback").updateMapping(feedbackMapping);
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
