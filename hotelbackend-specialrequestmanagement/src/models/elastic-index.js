const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const specialRequestMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationId: { type: "keyword", index: true },
  requestText: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  staffNote: { type: "text", index: true },
  submittedAt: { type: "date", index: true },
  resolvedAt: { type: "date", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("specialRequest", specialRequestMapping);
    await new ElasticIndexer("specialRequest").updateMapping(
      specialRequestMapping,
    );
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
