const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const SpecialRequest = require("./specialRequest");

SpecialRequest.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const statusOptions = ["requested", "inProgress", "fulfilled", "denied"];
  const dataTypestatusSpecialRequest = typeof data.status;
  const enumIndexstatusSpecialRequest =
    dataTypestatusSpecialRequest === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusSpecialRequest;
  data.status =
    enumIndexstatusSpecialRequest > -1
      ? statusOptions[enumIndexstatusSpecialRequest]
      : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  SpecialRequest,
  updateElasticIndexMappings,
};
