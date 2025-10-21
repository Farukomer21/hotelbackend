const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createRoomPrice: utils.createRoomPrice,
  getIdListOfRoomPriceByField: utils.getIdListOfRoomPriceByField,
  getRoomPriceById: utils.getRoomPriceById,
  getRoomPriceAggById: utils.getRoomPriceAggById,
  getRoomPriceListByQuery: utils.getRoomPriceListByQuery,
  getRoomPriceStatsByQuery: utils.getRoomPriceStatsByQuery,
  getRoomPriceByQuery: utils.getRoomPriceByQuery,
  updateRoomPriceById: utils.updateRoomPriceById,
  updateRoomPriceByIdList: utils.updateRoomPriceByIdList,
  updateRoomPriceByQuery: utils.updateRoomPriceByQuery,
  deleteRoomPriceById: utils.deleteRoomPriceById,
  deleteRoomPriceByQuery: utils.deleteRoomPriceByQuery,
  dbScriptCreateRoomprice: dbApiScripts.dbScriptCreateRoomprice,
  dbScriptGetRoomprice: dbApiScripts.dbScriptGetRoomprice,
  dbScriptUpdateRoomprice: dbApiScripts.dbScriptUpdateRoomprice,
  dbScriptDeleteRoomprice: dbApiScripts.dbScriptDeleteRoomprice,
  dbScriptListRoomprices: dbApiScripts.dbScriptListRoomprices,
};
