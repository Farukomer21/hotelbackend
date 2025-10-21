const mainFunctions = require("./main");

module.exports = {
  // main Database
  createReservation: mainFunctions.createReservation,
  getIdListOfReservationByField: mainFunctions.getIdListOfReservationByField,
  getReservationById: mainFunctions.getReservationById,
  getReservationAggById: mainFunctions.getReservationAggById,
  getReservationListByQuery: mainFunctions.getReservationListByQuery,
  getReservationStatsByQuery: mainFunctions.getReservationStatsByQuery,
  getReservationByQuery: mainFunctions.getReservationByQuery,
  updateReservationById: mainFunctions.updateReservationById,
  updateReservationByIdList: mainFunctions.updateReservationByIdList,
  updateReservationByQuery: mainFunctions.updateReservationByQuery,
  deleteReservationById: mainFunctions.deleteReservationById,
  deleteReservationByQuery: mainFunctions.deleteReservationByQuery,
  getReservationByReservationCode:
    mainFunctions.getReservationByReservationCode,
  dbScriptCreateReservation: mainFunctions.dbScriptCreateReservation,
  dbScriptGetReservation: mainFunctions.dbScriptGetReservation,
  dbScriptGetReservationbycode: mainFunctions.dbScriptGetReservationbycode,
  dbScriptUpdateReservation: mainFunctions.dbScriptUpdateReservation,
  dbScriptCancelReservationbycode:
    mainFunctions.dbScriptCancelReservationbycode,
  dbScriptDeleteReservation: mainFunctions.dbScriptDeleteReservation,
  dbScriptListReservations: mainFunctions.dbScriptListReservations,
};
