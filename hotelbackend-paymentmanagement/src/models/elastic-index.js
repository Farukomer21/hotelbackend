const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const paymentMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationId: { type: "keyword", index: true },
  amount: { type: "double", index: true },
  currency: { type: "keyword", index: true },
  paymentMethod: { type: "keyword", index: true },
  paymentMethod_: { type: "keyword" },
  paidAt: { type: "date", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  reference: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("payment", paymentMapping);
    await new ElasticIndexer("payment").updateMapping(paymentMapping);
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
