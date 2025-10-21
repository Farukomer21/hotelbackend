const reservationFunctions = require("./reservation");

module.exports = {
  // main Database
  createReservation: reservationFunctions.createReservation,
  getIdListOfReservationByField:
    reservationFunctions.getIdListOfReservationByField,
  getReservationById: reservationFunctions.getReservationById,
  getReservationAggById: reservationFunctions.getReservationAggById,
  getReservationListByQuery: reservationFunctions.getReservationListByQuery,
  getReservationStatsByQuery: reservationFunctions.getReservationStatsByQuery,
  getReservationByQuery: reservationFunctions.getReservationByQuery,
  updateReservationById: reservationFunctions.updateReservationById,
  updateReservationByIdList: reservationFunctions.updateReservationByIdList,
  updateReservationByQuery: reservationFunctions.updateReservationByQuery,
  deleteReservationById: reservationFunctions.deleteReservationById,
  deleteReservationByQuery: reservationFunctions.deleteReservationByQuery,
  getReservationByReservationCode:
    reservationFunctions.getReservationByReservationCode,
  dbScriptCreateReservation: reservationFunctions.dbScriptCreateReservation,
  dbScriptGetReservation: reservationFunctions.dbScriptGetReservation,
  dbScriptGetReservationbycode:
    reservationFunctions.dbScriptGetReservationbycode,
  dbScriptUpdateReservation: reservationFunctions.dbScriptUpdateReservation,
  dbScriptCancelReservationbycode:
    reservationFunctions.dbScriptCancelReservationbycode,
  dbScriptDeleteReservation: reservationFunctions.dbScriptDeleteReservation,
  dbScriptListReservations: reservationFunctions.dbScriptListReservations,
};
