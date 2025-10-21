const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const reservationMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationCode: { type: "keyword", index: true },
  guestId: { type: "keyword", index: true },
  roomId: { type: "keyword", index: true },
  packageIds: { type: "keyword", index: true },
  checkInDate: { type: "date", index: true },
  checkOutDate: { type: "date", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  specialRequestIds: { type: "keyword", index: true },
  paymentStatus: { type: "keyword", index: true },
  paymentStatus_: { type: "keyword" },
  totalAmount: { type: "double", index: true },
  notes: { type: "text", index: true },
  numGuests: { type: "integer", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("reservation", reservationMapping);
    await new ElasticIndexer("reservation").updateMapping(reservationMapping);
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
