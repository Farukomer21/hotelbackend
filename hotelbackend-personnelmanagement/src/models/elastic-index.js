const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const personnelMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  fullName: { type: "keyword", index: true },
  jobTitle: { type: "keyword", index: true },
  contactNumber: { type: "keyword", index: true },
  email: { type: "keyword", index: true },
  hireDate: { type: "date", index: true },
  department: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  notes: { type: "text", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("personnel", personnelMapping);
    await new ElasticIndexer("personnel").updateMapping(personnelMapping);
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
