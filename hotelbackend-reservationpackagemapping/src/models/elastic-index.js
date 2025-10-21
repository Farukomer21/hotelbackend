const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const reservationPackageMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationId: { type: "keyword", index: true },
  packageId: { type: "keyword", index: true },
  assignedAt: { type: "date", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("reservationPackage", reservationPackageMapping);
    await new ElasticIndexer("reservationPackage").updateMapping(
      reservationPackageMapping,
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
