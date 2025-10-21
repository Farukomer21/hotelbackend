const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const roomPriceMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  roomId: { type: "keyword", index: true },
  price: { type: "double", index: true },
  validFrom: { type: "date", index: true },
  validTo: { type: "date", index: true },
  reason: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("roomPrice", roomPriceMapping);
    await new ElasticIndexer("roomPrice").updateMapping(roomPriceMapping);
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
