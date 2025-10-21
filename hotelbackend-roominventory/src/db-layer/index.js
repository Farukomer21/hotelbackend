const mainFunctions = require("./main");

module.exports = {
  // main Database
  createRoom: mainFunctions.createRoom,
  getIdListOfRoomByField: mainFunctions.getIdListOfRoomByField,
  getRoomById: mainFunctions.getRoomById,
  getRoomAggById: mainFunctions.getRoomAggById,
  getRoomListByQuery: mainFunctions.getRoomListByQuery,
  getRoomStatsByQuery: mainFunctions.getRoomStatsByQuery,
  getRoomByQuery: mainFunctions.getRoomByQuery,
  updateRoomById: mainFunctions.updateRoomById,
  updateRoomByIdList: mainFunctions.updateRoomByIdList,
  updateRoomByQuery: mainFunctions.updateRoomByQuery,
  deleteRoomById: mainFunctions.deleteRoomById,
  deleteRoomByQuery: mainFunctions.deleteRoomByQuery,
  dbScriptCreateRoom: mainFunctions.dbScriptCreateRoom,
  dbScriptUpdateRoom: mainFunctions.dbScriptUpdateRoom,
  dbScriptDeleteRoom: mainFunctions.dbScriptDeleteRoom,
  dbScriptGetRoom: mainFunctions.dbScriptGetRoom,
  dbScriptListRooms: mainFunctions.dbScriptListRooms,
};
