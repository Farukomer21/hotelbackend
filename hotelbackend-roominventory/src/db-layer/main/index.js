const roomFunctions = require("./room");

module.exports = {
  // main Database
  createRoom: roomFunctions.createRoom,
  getIdListOfRoomByField: roomFunctions.getIdListOfRoomByField,
  getRoomById: roomFunctions.getRoomById,
  getRoomAggById: roomFunctions.getRoomAggById,
  getRoomListByQuery: roomFunctions.getRoomListByQuery,
  getRoomStatsByQuery: roomFunctions.getRoomStatsByQuery,
  getRoomByQuery: roomFunctions.getRoomByQuery,
  updateRoomById: roomFunctions.updateRoomById,
  updateRoomByIdList: roomFunctions.updateRoomByIdList,
  updateRoomByQuery: roomFunctions.updateRoomByQuery,
  deleteRoomById: roomFunctions.deleteRoomById,
  deleteRoomByQuery: roomFunctions.deleteRoomByQuery,
  dbScriptCreateRoom: roomFunctions.dbScriptCreateRoom,
  dbScriptUpdateRoom: roomFunctions.dbScriptUpdateRoom,
  dbScriptDeleteRoom: roomFunctions.dbScriptDeleteRoom,
  dbScriptGetRoom: roomFunctions.dbScriptGetRoom,
  dbScriptListRooms: roomFunctions.dbScriptListRooms,
};
