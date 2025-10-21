const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const guestMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  fullName: { type: "keyword", index: true },
  contactNumber: { type: "keyword", index: true },
  email: { type: "keyword", index: true },
  address: { type: "text", index: true },
  identificationType: { type: "keyword", index: true },
  identificationNumber: { type: "keyword", index: true },
  notes: { type: "text", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("guest", guestMapping);
    await new ElasticIndexer("guest").updateMapping(guestMapping);
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
