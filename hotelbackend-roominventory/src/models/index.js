const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Room = require("./room");

Room.prototype.getData = function () {
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
  const typeOptions = [
    "single",
    "double",
    "suite",
    "family",
    "deluxe",
    "accessible",
    "other",
  ];
  const dataTypetypeRoom = typeof data.type;
  const enumIndextypeRoom =
    dataTypetypeRoom === "string" ? typeOptions.indexOf(data.type) : data.type;
  data.type_idx = enumIndextypeRoom;
  data.type = enumIndextypeRoom > -1 ? typeOptions[enumIndextypeRoom] : null;
  // set enum Index and enum value
  const statusOptions = [
    "available",
    "occupied",
    "maintenance",
    "outOfService",
  ];
  const dataTypestatusRoom = typeof data.status;
  const enumIndexstatusRoom =
    dataTypestatusRoom === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusRoom;
  data.status =
    enumIndexstatusRoom > -1 ? statusOptions[enumIndexstatusRoom] : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  Room,
  updateElasticIndexMappings,
};
