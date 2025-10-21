const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Personnel = require("./personnel");

Personnel.prototype.getData = function () {
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
  const statusOptions = ["active", "inactive", "terminated"];
  const dataTypestatusPersonnel = typeof data.status;
  const enumIndexstatusPersonnel =
    dataTypestatusPersonnel === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusPersonnel;
  data.status =
    enumIndexstatusPersonnel > -1
      ? statusOptions[enumIndexstatusPersonnel]
      : null;

  return data;
};

module.exports = {
  Personnel,
  updateElasticIndexMappings,
};
