const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createRoom: utils.createRoom,
  getIdListOfRoomByField: utils.getIdListOfRoomByField,
  getRoomById: utils.getRoomById,
  getRoomAggById: utils.getRoomAggById,
  getRoomListByQuery: utils.getRoomListByQuery,
  getRoomStatsByQuery: utils.getRoomStatsByQuery,
  getRoomByQuery: utils.getRoomByQuery,
  updateRoomById: utils.updateRoomById,
  updateRoomByIdList: utils.updateRoomByIdList,
  updateRoomByQuery: utils.updateRoomByQuery,
  deleteRoomById: utils.deleteRoomById,
  deleteRoomByQuery: utils.deleteRoomByQuery,
  dbScriptCreateRoom: dbApiScripts.dbScriptCreateRoom,
  dbScriptUpdateRoom: dbApiScripts.dbScriptUpdateRoom,
  dbScriptDeleteRoom: dbApiScripts.dbScriptDeleteRoom,
  dbScriptGetRoom: dbApiScripts.dbScriptGetRoom,
  dbScriptListRooms: dbApiScripts.dbScriptListRooms,
};
